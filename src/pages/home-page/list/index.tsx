import { component$, useContext } from "@builder.io/qwik";
import c from "clsx";

import { Context } from "~/utils/SearchParams";
import Card from "~/components/card";

import styles from "./style.module.css";

type props = {
  class?: string;
};

export default component$<props>((props) => {
  const state = useContext(Context);

  return (
    <ol class={c(props.class, styles.rootX)}>
      {state.list.map((e) => (
        <li key={e.id}>
          <Card data={e} />
        </li>
      ))}
    </ol>
  );
});
