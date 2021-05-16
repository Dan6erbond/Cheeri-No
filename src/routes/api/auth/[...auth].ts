import { Auth } from "$lib/SvelteAuth";
import { GoogleOAuthProvider } from "$lib/SvelteAuth/providers";

export const { get } = new Auth({
  providers: [
    new GoogleOAuthProvider({
      clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
});
