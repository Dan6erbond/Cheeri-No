import { Auth } from "./SvelteAuth";
import { GoogleOAuthProvider } from "./SvelteAuth/providers";
import { FacebookAuthProvider } from "./SvelteAuth/providers/facebook";

export const appAuth = new Auth({
  providers: [
    new GoogleOAuthProvider({
      clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET,
    }),
    new FacebookAuthProvider({
      clientId: import.meta.env.VITE_FACEBOOK_OAUTH_CLIENT_ID,
      clientSecret: import.meta.env.VITE_FACEBOOK_OAUTH_CLIENT_SECRET,
    }),
  ],
});
