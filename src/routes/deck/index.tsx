import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { type SearchResponse } from "~/utils/SearchParams";

import ToError from "~/utils/Error";
import Page from "~/pages/deck-page";

// export const onGet: RequestHandler = async ({ cookie, redirect, url }) => {
//   const maybeToken = cookie.get("token");

//   if (maybeToken?.value && maybeToken.value.length > 0) {
//     throw redirect(308, new URL("/", url).toString());
//   }
// };

export const use = routeLoader$(async ({ url, cookie, redirect }) => {
  const maybeToken = cookie.get("token");

  if (maybeToken) {
    try {
      const res = await fetch(
        `https://polydevil-bankimonline.builtwithdark.com/deck`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            token: maybeToken.value,
          },
        },
      );

      if (res.ok) {
        const data = await res.json();

        if (Array.isArray(data)) {
          return {
            list: data as Array<SearchResponse.hit>,
          };
        }
      }

      throw new Error("no data");
    } catch (maybeError: unknown) {
      return {
        errorMessage: ToError(maybeError).message,
      };
    }
  }

  throw redirect(308, new URL("/", url).toString());
});

export default component$(() => {
  const d = use();

  if ("errorMessage" in d.value) {
    return <>{d.value.errorMessage}</>;
  }

  return <Page data={d.value.list} />;
});
