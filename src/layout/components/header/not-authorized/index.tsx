import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import c from "clsx";

import styles from "../style.module.css";

type props = {
  class?: string;
};

export default component$<props>((props) => {
  return (
    <header class={c(props.class, styles.rootX)}>
      <nav>
        <ul role="list" class={styles.notAuthorizedX}>
          <li>
            <Link href="/">
              <span>HomePage</span>
            </Link>
          </li>
          <li>
            <Link href="/auth/sign-in">
              <span>Sign in</span>
              <svg
                role="presentation"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M4 15H6V20H18V4H6V9H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V15ZM10 11V8L15 12L10 16V13H2V11H10Z"
                ></path>
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});
