import { component$ } from "@builder.io/qwik";
import c from "clsx";

import Card from "~/components/card";
import { type SearchResponse } from "~/utils/SearchParams";

import styles from "./style.module.css";

type props = {
  class?: string;
  data: Array<SearchResponse.hit>;
};

export default component$<props>((props) => {
  return (
    <div class={c(props.class, styles.rootX)}>
      <section>
        <h1>My Deck</h1>

        <ol>
          {props.data.map((e) => (
            <li key={e.id}>
              <Card data={e} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
});
