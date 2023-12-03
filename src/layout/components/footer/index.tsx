import { component$ } from "@builder.io/qwik";
import c from "clsx";

import styles from "./style.module.css";

type props = {
  class?: string;
};

export default component$<props>((props) => {
  return (
    <div class={c(props.class, styles.rootX)}>
      <footer>
        <address>
          Made in <b>Dresden</b> with <em title="love">❤️</em>
        </address>

        <small>Copyright © 2023</small>
      </footer>
    </div>
  );
});
