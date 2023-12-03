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
      <h3>{props.data.name}</h3>

      {props.data.isLegendary ? <em title="legendary">{"\u2728"}</em> : null}

      <dl>
        <div>
          <dt>Type:</dt>
          <dd>{props.data.type1}</dd>
          {props.data.type2 ? <dd>{props.data.type2}</dd> : null}
        </div>
        <div>
          <dt>Generation:</dt>
          <dd>{props.data.generation}</dd>
        </div>
        <div>
          <dt>Attack:</dt>
          <dd>{props.data.attack}</dd>
        </div>
        <div>
          <dt>Defense:</dt>
          <dd>{props.data.defense}</dd>
        </div>
      </dl>
    </article>
  );
});
