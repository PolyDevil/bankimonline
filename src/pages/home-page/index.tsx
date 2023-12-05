import { component$ } from "@builder.io/qwik";
import c from "clsx";

import List from "./list";
import Pagination from "./pagination";
import Sorting from "./sorting";
import Search from "./search";
import styles from "./style.module.css";

type props = {
  class?: string;
};

export default component$<props>((props) => {
  return (
    <div class={c(props.class, styles.rootX)}>
      <section>
        <search>
          <Search />
          <Sorting />
        </search>
        <List />
        <Pagination />
      </section>
    </div>
  );
});
