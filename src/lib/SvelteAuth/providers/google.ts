import type { ServerRequest } from "@sveltejs/kit/types/endpoint";
import { Provider, ProviderConfig } from "./base";

interface GoogleOAuthProviderConfig extends ProviderConfig {
  discoveryDocument?: string;
  clientId: string;
  clientSecret: string;
  scope?: string;
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

  async signin({ host }: ServerRequest) {
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

    return {
      status: 302,
      headers: {
        Location: `${authorizationEndpoint}?${new URLSearchParams(data)}`,
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

  async callback({ query, host }: ServerRequest): [any, any] {
    const code = query.get("code");
    const tokens = await this.getTokens(code, this.getRedirectUri(host));
    const user = await this.getUserProfile(tokens);

    const queryData = {};
    query.forEach((value, key) => {
      queryData[key] = queryData[key]
        ? Array.isArray(queryData[key])
          ? [...queryData[key], value]
          : [queryData[key], value]
        : value;
    });

    return [tokens, user];
  }
}
