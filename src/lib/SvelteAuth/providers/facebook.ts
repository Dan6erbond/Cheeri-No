import type { EndpointOutput, ServerRequest } from "@sveltejs/kit/types/endpoint";
import type { CallbackResult } from "../types";
import { Provider, ProviderConfig } from "./base";

interface FacebookAuthProviderConfig extends ProviderConfig {
  clientId: string;
  clientSecret: string;
  scope?: string;
  userProfileFields?: string;
  profile?: (profile: any, tokens: any) => any | Promise<any>;
}

const defaultConfig: Partial<FacebookAuthProviderConfig> = {
  id: "facebook",
  scope: "email public_profile user_link",
  userProfileFields:
    "id,name,first_name,last_name,middle_name,name_format,picture,short_name,email",
};

export class FacebookAuthProvider extends Provider<FacebookAuthProviderConfig> {
  constructor(config: FacebookAuthProviderConfig) {
    super({
      ...defaultConfig,
      ...config,
    });
  }

  async signin({ host, method }: ServerRequest): Promise<EndpointOutput> {
    const endpoint = "https://www.facebook.com/v10.0/dialog/oauth";

    const data = {
      client_id: this.config.clientId,
      redirect_uri: this.getRedirectUri(host),
      state: "1234", // TODO: Generate random
    };

    const url = `${endpoint}?${new URLSearchParams(data)}`;

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

  getRedirectUri(host: string) {
    return `http://${host}${"/api/auth/callback/"}${this.id}`;
  }

  async getTokens(code: string, redirectUri: string) {
    const endpoint = "https://graph.facebook.com/v10.0/oauth/access_token";

    const data = {
      code,
      client_id: this.config.clientId,
      redirect_uri: redirectUri,
      client_secret: this.config.clientSecret,
    };

    const res = await fetch(`${endpoint}?${new URLSearchParams(data)}`);
    return await res.json();
  }

  async inspectToken(tokens: any) {
    const endpoint = "https://graph.facebook.com/debug_token";

    const data = {
      input_token: tokens.access_token,
      access_token: `${this.config.clientId}|${this.config.clientSecret}`,
    };

    const res = await fetch(`${endpoint}?${new URLSearchParams(data)}`);
    return await res.json();
  }

  async getUserProfile(tokens: any, inspectResult: any) {
    const endpoint = `https://graph.facebook.com/v10.0/${inspectResult.data.user_id}`;

    const data = {
      access_token: tokens.access_token,
      fields: this.config.userProfileFields,
    };

    const res = await fetch(`${endpoint}?${new URLSearchParams(data)}`);
    return await res.json();
  }

  async callback({ query, host }: ServerRequest): Promise<CallbackResult> {
    const code = query.get("code");
    const tokens = await this.getTokens(code, this.getRedirectUri(host));
    const inspectResult = await this.inspectToken(tokens);
    let user = await this.getUserProfile(tokens, inspectResult);

    if (this.config.profile) {
      user = await this.config.profile(user, tokens);
    }

    return [user, ""];
  }
}
