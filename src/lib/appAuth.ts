import { Auth } from "./SvelteAuth";
import { GoogleOAuthProvider } from "./SvelteAuth/providers";
import { FacebookAuthProvider } from "./SvelteAuth/providers/facebook";

export const appAuth = new Auth({
  providers: [
    new GoogleOAuthProvider({
      clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET,
      profile(profile) {
        return { ...profile, provider: "google" };
      },
    }),
    new FacebookAuthProvider({
      clientId: import.meta.env.VITE_FACEBOOK_OAUTH_CLIENT_ID,
      clientSecret: import.meta.env.VITE_FACEBOOK_OAUTH_CLIENT_SECRET,
      profile(profile) {
        return { ...profile, provider: "facebook" };
      },
    }),
  ],
  callbacks: {
    jwt(token, profile) {
      if (profile?.provider) {
        token = {
          ...token,
          user: {
            ...token.user,
            [profile.provider]: profile,
          },
        };
      }

      return token;
    },
  },
});
