import { component$, Slot, useContext } from "@builder.io/qwik";
import {
  type LinkProps,
  useNavigate,
  useLocation,
} from "@builder.io/qwik-city";
import { Context, refine } from "~/utils/SearchParams";
import c from "clsx";

import paginator from "./paginator";
import styles from "./styles.module.css";

type props = {
  class?: string;
};

const Page = component$<Omit<LinkProps, "href"> & { page: number }>(
  ({ page, ...props }) => {
    const nav = useNavigate();
    const loc = useLocation();
    const state = useContext(Context);

    const href =
      loc.url.pathname +
      refine(state, {
        type: "page",
        value: page,
      });

    return (
      <a
        preventdefault:click
        href={href}
        onClick$={() => nav(href)}
        aria-current={state.page === page ? "page" : "false"}
        {...props}
      >
        <Slot />
      </a>
    );
  },
);

export default component$((props: props) => {
  const state = useContext(Context);

  const pagination = paginator({
    page: state.page,
    size: state.pages,
  });

  if (pagination) {
    return (
      <nav class={c(props.class, styles.rootX)}>
        <ol>
          {pagination.map((page) => (
            <li key={String(page)}>
              {typeof page === "number" ? (
                <Page page={page}>{page}</Page>
              ) : (
                <div>{"\u2026"}</div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return null;
});
