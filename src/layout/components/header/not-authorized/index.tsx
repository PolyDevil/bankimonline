import { component$ } from "@builder.io/qwik";
import { useLocation, Link } from "@builder.io/qwik-city";
import c from "clsx";

import styles from "../style.module.css";

type props = {
  class?: string;
};

export default component$<props>((props) => {
  const loc = useLocation();

  return (
    <header class={c(props.class, styles.rootX)}>
      <nav>
        <ul role="list" class={styles.notAuthorizedX}>
          <li>
            <Link
              href="/"
              aria-current={loc.url.pathname === "/" ? "page" : "false"}
            >
              <span>
                Home<b>Page</b>
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/auth/sign-in"
              aria-current={
                loc.url.pathname === "/auth/sign-in/" ? "page" : "false"
              }
            >
              <svg
                role="presentation"
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 13L5 9M5 9L9 5M5 9H19M14 13V14C14 14.7956 13.6839 15.5587 13.1213 16.1213C12.5587 16.6839 11.7956 17 11 17H4C3.20435 17 2.44129 16.6839 1.87868 16.1213C1.31607 15.5587 1 14.7956 1 14V4C1 3.20435 1.31607 2.44129 1.87868 1.87868C2.44129 1.31607 3.20435 1 4 1H11C11.7956 1 12.5587 1.31607 13.1213 1.87868C13.6839 2.44129 14 3.20435 14 4V5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <b>Sign in</b>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});
