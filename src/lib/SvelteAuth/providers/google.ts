import type { EndpointOutput, ServerRequest } from "@sveltejs/kit/types/endpoint";
import type { CallbackResult } from "../types";
import { Provider, ProviderConfig } from "./base";

interface GoogleOAuthProviderConfig extends ProviderConfig {
  discoveryDocument?: string;
  clientId: string;
  clientSecret: string;
  scope?: string;
  profile?: (profile: any, tokens: any) => any | Promise<any>;
}

const defaultConfig: Partial<GoogleOAuthProviderConfig> = {
  id: "google",
  discoveryDocument: "https://accounts.google.com/.well-known/openid-configuration",
  scope: "openid profile email",
};

export class GoogleOAuthProvider extends Provider<GoogleOAuthProviderConfig> {
  constructor(config: GoogleOAuthProviderConfig) {
    super({
      ...defaultConfig,
      ...config,
    });
  }

  async getProviderMetadata() {
    const res = await fetch(this.config.discoveryDocument);
    const metadata = await res.json();
    return metadata;
  }

  async getEndpoint(key: string) {
    const metadata = await this.getProviderMetadata();
    return metadata[key] as string;
  }

  getRedirectUri(host: string) {
    return `http://${host}${"/api/auth/callback/"}${this.id}`;
  }

  async signin({ host, method }: ServerRequest): Promise<EndpointOutput> {
    const authorizationEndpoint = await this.getEndpoint("authorization_endpoint");

    const data = {
      response_type: "code",
      client_id: this.config.clientId,
      scope: this.config.scope,
      redirect_uri: this.getRedirectUri(host),
      state: "1234", // TODO: Generate random
      login_hint: "example@provider.com",
      nonce: Math.round(Math.random() * 1000).toString(), // TODO: Check
    };

    const url = `${authorizationEndpoint}?${new URLSearchParams(data)}`;

    if (method === "POST") {
      return {
        body: {
          redirect: url,
        },
      };
    }

    return {
      status: 302,
      headers: {
        Location: url,
      },
    };
  }

  async getTokens(code: string, redirectUri: string) {
    const tokenEndpoint = await this.getEndpoint("token_endpoint");

    const data = {
      code,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    };

    const res = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  }

  async getUserProfile(tokens: any) {
    const userProfileEndpoint = await this.getEndpoint("userinfo_endpoint");
    const res = await fetch(userProfileEndpoint, {
      headers: { Authorization: `${tokens.token_type} ${tokens.access_token}` },
    });
    return await res.json();
  }

  async callback({ query, host }: ServerRequest): Promise<CallbackResult> {
    const code = query.get("code");
    const tokens = await this.getTokens(code, this.getRedirectUri(host));
    let user = await this.getUserProfile(tokens);

    if (this.config.profile) {
      user = await this.config.profile(user, tokens);
    }

    return [user, ""];
  }
}
