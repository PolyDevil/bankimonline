import { component$ } from "@builder.io/qwik";
import c from "clsx";
import { type SearchResponse } from "~/utils/SearchParams";

import styles from "./style.module.css";

type props = {
  class?: string;
  data: SearchResponse.hit;
};

export default component$<props>((props) => {
  return (
    <article class={c(props.class, styles.rootX)}>
      <span>{`#${String(props.data.id).padStart(3, "0")}`}</span>

      <h3>{props.data.name}</h3>

      <dl>
        <div>
          <dt>Attack</dt>
          <dd>{props.data.attack}</dd>
        </div>
        <div>
          <dt>Defense</dt>
          <dd>{props.data.defense}</dd>
        </div>
      </dl>
    </article>
  );
});
