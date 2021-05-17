import { Auth } from "./SvelteAuth";
import { GoogleOAuthProvider } from "./SvelteAuth/providers";
import { FacebookAuthProvider } from "./SvelteAuth/providers/facebook";
import { TwitterAuthProvider } from "./SvelteAuth/providers/twitter";

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
    new TwitterAuthProvider({
      apiKey: import.meta.env.VITE_TWITTER_API_KEY,
      apiSecret: import.meta.env.VITE_TWITTER_API_SECRET,
      profile(profile) {
        return { ...profile, provider: "twitter" };
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
