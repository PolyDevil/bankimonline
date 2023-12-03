import { component$ } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cookie, redirect, url }) => {
  cookie.set("token", "", {
    path: "/",
  });

  throw redirect(308, new URL("/", url).toString());
};

export default component$(() => null);
