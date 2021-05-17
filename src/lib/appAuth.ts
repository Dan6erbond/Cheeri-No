import { Auth } from "./SvelteAuth";
import { GoogleOAuthProvider } from "./SvelteAuth/providers";
import { FacebookAuthProvider } from "./SvelteAuth/providers/facebook";
import { RedditOAuthProvider } from "./SvelteAuth/providers/reddit";
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
    new RedditOAuthProvider({
      apiKey: import.meta.env.VITE_REDDIT_API_KEY,
      apiSecret: import.meta.env.VITE_REDDIT_API_SECRET,
      profile({
        is_employee,
        has_external_account,
        snoovatar_img,
        verified,
        id,
        over_18,
        is_gold,
        is_mod,
        awarder_karma,
        has_verified_email,
        is_suspended,
        icon_img,
        pref_nightmode,
        awardee_karma,
        password_set,
        link_karma,
        total_karma,
        name,
        created,
        created_utc,
        comment_karma,
      }) {
        return {
          is_employee,
          has_external_account,
          snoovatar_img,
          verified,
          id,
          over_18,
          is_gold,
          is_mod,
          awarder_karma,
          has_verified_email,
          is_suspended,
          icon_img,
          pref_nightmode,
          awardee_karma,
          password_set,
          link_karma,
          total_karma,
          name,
          created,
          created_utc,
          comment_karma,
          provider: "reddit",
        };
      },
    }),
  ],
  callbacks: {
    jwt(token, profile) {
      if (profile?.provider) {
        const { provider, ...account } = profile;
        token = {
          ...token,
          user: {
            ...token.user,
            [provider]: account,
          },
        };
      }

      return token;
    },
  },
});
