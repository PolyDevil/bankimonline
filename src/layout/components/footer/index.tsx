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
        <div>
          <strong>Company Name</strong>
          <div>
            Made by <em>Poly</em>
          </div>
        </div>

        <small>2023 © Все права защищены</small>
      </footer>
    </div>
  );
});
