import { component$ } from "@builder.io/qwik";
import { routeAction$, type RequestHandler } from "@builder.io/qwik-city";

import Page from "~/pages/auth/sign-in-page";

type form = {
  phone: string;
  password: string;
};

export const useAuth = routeAction$(async (data, { cookie }) => {
  const formData = data as form;

  const response = await fetch(
    `https://polydevil-bankimonline.builtwithdark.com/auth/sign-in`,
    {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const d = await response.json();

  if ("token" in d) {
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1000 * 36000;
    now.setTime(expireTime);

    cookie.set("token", d.token, { path: "/", expires: now.toUTCString() });

    return { status: "success" };
  }

  return {
    status: "error",
  };
});

export const onGet: RequestHandler = async ({ cookie, redirect, url }) => {
  const maybeToken = cookie.get("token");

  if (maybeToken !== null) {
    throw redirect(308, new URL("/", url).toString());
  }
};

export default component$(() => {
  return <Page />;
});
