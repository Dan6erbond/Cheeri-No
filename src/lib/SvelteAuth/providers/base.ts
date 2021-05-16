import type { EndpointOutput } from "@sveltejs/kit";
import type { ServerRequest } from "@sveltejs/kit/types/endpoint";

export interface ProviderConfig {
  id?: string;
  profile?: (profile: any, account: any) => any | Promise<any>;
}

export abstract class Provider<T extends ProviderConfig = ProviderConfig> {
  id: string;

  constructor(protected readonly config: T) {
    this.id = config.id;
  }

  abstract signin<Locals extends Record<string, any> = Record<string, any>, Body = unknown>(
    request: ServerRequest<Locals, Body>,
  ): EndpointOutput | Promise<EndpointOutput>;

  abstract verify<Locals extends Record<string, any> = Record<string, any>, Body = unknown>(
    request: ServerRequest<Locals, Body>,
  ): [any, any, string | null] | Promise<[any, any, string | null]>;

  async callback<Locals extends Record<string, any> = Record<string, any>, Body = unknown>(
    request: ServerRequest<Locals, Body>,
  ): Promise<[any, any, string | null]> {
    const res = await this.verify(request);
    const [, account, redirectUrl] = res;
    let [profile] = res;

    if (this.config.profile) {
      profile = await this.config.profile(profile, account);
    }

    return [profile, account, redirectUrl];
  }
}
