import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import HeaderAuthorized from "~/layout/components/header/authorized";
import HeaderNotAuthorized from "~/layout/components/header/not-authorized";
import Footer from "~/layout/components/footer";

import styles from "./style.module.css";

export const useSession = routeLoader$(async ({ cookie }) => {
  const maybeToken = cookie.get("token");

  if (maybeToken && maybeToken.value && maybeToken.value.length > 0) {
    return {
      state: "auth",
      token: maybeToken.value,
    };
  }

  return {
    state: "no-auth",
  };
});

export default component$(() => {
  const session = useSession();

  return (
    <div class={styles.rootX}>
      {session.value.state === "auth" ? (
        <HeaderAuthorized />
      ) : (
        <HeaderNotAuthorized />
      )}

      <div class={styles.scrollableX}>
        <main>
          <Slot />
        </main>

        <Footer />
      </div>
    </div>
  );
});
