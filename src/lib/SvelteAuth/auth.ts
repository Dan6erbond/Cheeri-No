import type { RequestHandler } from "@sveltejs/kit";
import type { Provider } from "./providers";

interface AuthConfig {
  providers?: Provider[];
}

export class Auth {
  constructor(private readonly config?: AuthConfig) {}

  get: RequestHandler = async (request) => {
    const { path } = request;

    if (path === "/api/auth/csrf") {
      return { body: "1234" }; // TODO: Generate real token
    }

    const match = path.match(/\/api\/auth\/(?<method>login|callback)\/(?<provider>\w+)/);

    if (match) {
      const provider = this.config?.providers?.find(
        (provider) => provider.id === match.groups.provider,
      );
      if (provider) {
        if (match.groups.method === "login") {
          return await provider.login(request);
        } else {
          return await provider.callback(request);
        }
      }
    }
  };
}
