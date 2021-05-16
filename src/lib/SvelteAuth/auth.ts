import type { GetSession, RequestHandler } from "@sveltejs/kit";
import type { Headers } from "@sveltejs/kit/types/helper";
import cookie from "cookie";
import * as jsonwebtoken from "jsonwebtoken";
import type { JWT, Session } from "./interfaces";
import type { Provider } from "./providers";

interface AuthConfig {
  providers?: Provider[];
  callbacks?: AuthCallbacks;
  jwtSecret?: string;
  jwtExpiresIn?: string | number;
}

interface AuthCallbacks {
  signIn: () => boolean | Promise<boolean>;
  jwt: (token: JWT, profile?: any, account?: any) => JWT | Promise<JWT>;
  session: (token: JWT) => Session | Promise<Session>;
  redirect: () => string | Promise<string>;
}

export class Auth {
  constructor(private readonly config?: AuthConfig) {}

  getJwtSecret() {
    if (this.config?.jwtSecret) {
      return this.config?.jwtSecret;
    }

    if (this.config?.providers?.length) {
      const provs = this.config?.providers?.map((provider) => provider.id).join("+");
      return btoa(provs);
    }

    return "svelte_auth_secret";
  }

  async getToken(headers: Headers) {
    if (!headers.cookie) {
      return null;
    }
    const cookies = cookie.parse(headers.cookie);
    let token = (jsonwebtoken.verify(cookies.svelteauthjwt, this.getJwtSecret()) || {}) as JWT;

    if (this.config?.callbacks?.jwt) {
      token = await this.config.callbacks.jwt(token);
    }

    return token;
  }

  setToken(headers: Headers, newToken: JWT) {
    const originalToken = this.getToken(headers);

    return {
      ...(originalToken ?? {}),
      ...newToken,
    };
  }

  get: RequestHandler = async (request) => {
    const { path, headers } = request;

    if (path === "/api/auth/csrf") {
      return { body: "1234" }; // TODO: Generate real token
    }

    const match = path.match(/\/api\/auth\/(?<method>signin|callback)\/(?<provider>\w+)/);

    if (match) {
      const provider = this.config?.providers?.find(
        (provider) => provider.id === match.groups.provider,
      );
      if (provider) {
        if (match.groups.method === "signin") {
          return await provider.signin(request);
        } else {
          const [profile, account] = await provider.callback(request);

          let token: JWT;

          if (this.config?.callbacks?.jwt) {
            token = await this.config.callbacks.jwt(token, account, profile);
          } else {
            token = this.setToken(headers, { user: profile });
          }

          const jwt = jsonwebtoken.sign(token, this.getJwtSecret(), {
            expiresIn: this.config?.jwtExpiresIn ?? "30d",
          });

          return {
            headers: {
              "set-cookie": `svelteauthjwt=${jwt}; Path=/; HttpOnly`,
            },
          };
        }
      }
    }
  };

  getSession: GetSession = async ({ headers }) => {
    const token = await this.getToken(headers);

    if (token) {
      if (this.config?.callbacks?.session) {
        return await this.config.callbacks.session(token);
      }

      return { user: token.user };
    }
  };
}
