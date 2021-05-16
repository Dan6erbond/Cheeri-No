declare module "$app/stores" {
  import type { Session } from "./lib/SvelteAuth/interfaces";

  export const session: Writable<Session>;
}
