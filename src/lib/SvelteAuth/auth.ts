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
  signIn?: () => boolean | Promise<boolean>;
  jwt?: (token: JWT, profile?: any, account?: any) => JWT | Promise<JWT>;
  session?: (token: JWT, session: Session) => Session | Promise<Session>;
  redirect?: (url: string) => string | Promise<string>;
}

export class Auth {
  constructor(private readonly config?: AuthConfig) {}

  getJwtSecret() {
    if (this.config?.jwtSecret) {
      return this.config?.jwtSecret;
    }

    if (this.config?.providers?.length) {
      const provs = this.config?.providers?.map((provider) => provider.id).join("+");
      return Buffer.from(provs).toString("base64");
    }

    return "svelte_auth_secret";
  }

  async getToken(headers: Headers) {
    if (!headers.cookie) {
      return null;
    }

    const cookies = cookie.parse(headers.cookie);

    if (!cookies.svelteauthjwt) {
      return null;
    }

    let token = (jsonwebtoken.verify(cookies.svelteauthjwt, this.getJwtSecret()) || {}) as JWT;

    if (this.config?.callbacks?.jwt) {
      token = await this.config.callbacks.jwt(token);
    }

    return token;
  }

  getBaseUrl(host: string) {
    return `http://${host}`;
  }

  setToken(headers: Headers, newToken: JWT | any) {
    const originalToken = this.getToken(headers);

    return {
      ...(originalToken ?? {}),
      ...newToken,
    };
  }

  signToken(token: JWT | any) {
    const opts = !token.exp
      ? {
          expiresIn: this.config?.jwtExpiresIn ?? "30d",
        }
      : {};
    const jwt = jsonwebtoken.sign(token, this.getJwtSecret(), opts);
    return jwt;
  }

  async getRedirectUrl(host: string, redirectUrl?: string) {
    let redirect = redirectUrl || this.getBaseUrl(host);
    if (this.config?.callbacks?.redirect) {
      redirect = await this.config.callbacks.redirect(redirect);
    }
    return redirect;
  }

  get: RequestHandler = async (request) => {
    const { path, headers, host } = request;

    if (path === "/api/auth/csrf") {
      return { body: "1234" }; // TODO: Generate real token
    } else if (path === "/api/auth/session") {
      const session = await this.getSession(request);
      return {
        body: {
          session,
        },
      };
    } else if (path === "/api/auth/signout") {
      const token = this.setToken(headers, {});
      const jwt = this.signToken(token);
      const redirect = await this.getRedirectUrl(host);

      return {
        status: 302,
        headers: {
          "set-cookie": `svelteauthjwt=${jwt}; Path=/; HttpOnly`,
          Location: redirect,
        },
      };
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
          const [profile, account, redirectUrl] = await provider.callback(request);

          let token = (await this.getToken(headers)) ?? { user: {} };
          if (this.config?.callbacks?.jwt) {
            token = await this.config.callbacks.jwt(token, profile, account);
          } else {
            token = this.setToken(headers, { user: profile });
          }

          const jwt = this.signToken(token);
          const redirect = await this.getRedirectUrl(host, redirectUrl);

          return {
            status: 302,
            headers: {
              "set-cookie": `svelteauthjwt=${jwt}; Path=/; HttpOnly`,
              Location: redirect,
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
        return await this.config.callbacks.session(token, { user: token.user });
      }

      return { user: token.user };
    }
  };
}
