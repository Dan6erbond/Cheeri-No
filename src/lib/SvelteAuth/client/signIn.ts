import { goto } from "$app/navigation";
import { page } from "$app/stores";
import type { Page } from "@sveltejs/kit";

interface SignInConfig {
  redirectUrl?: string;
}

export async function signIn(provider: string, data?: any, config?: SignInConfig) {
  let redirectUrl: string;
  if (config?.redirectUrl) {
    redirectUrl = config.redirectUrl;
  } else {
    let $val: Page;
    page.subscribe(($) => ($val = $))();
    redirectUrl = `${$val.host}${$val.path}?${$val.query}`;
  }

  const queryData = {
    redirectUrl,
  };
  const query = new URLSearchParams(queryData);
  const path = `/api/auth/callback/${provider}?${query}`;

  if (data) {
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  }

  return await goto(path);
}
