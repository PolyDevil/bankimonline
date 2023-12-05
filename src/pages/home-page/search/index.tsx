import { component$, useContext, useSignal } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { Context, refine } from "~/utils/SearchParams";
import styles from "./styles.module.css";

type props = {
  class?: string;
};

const name = "search";

type form = Record<typeof name, string>;

export default component$((props: props) => {
  const nav = useNavigate();
  const loc = useLocation();
  const state = useContext(Context);
  const formRef = useSignal<HTMLFormElement>();

  return (
    <form
      class={styles.rootX + " " + props.class}
      preventdefault:submit
      ref={formRef}
    >
      <label>
        <span>search</span>
        <input
          autoComplete="off"
          placeholder="Search..."
          type="search"
          name={name}
          value={state.search}
          onBlur$={() => {
            if (formRef.value) {
              const { search: value } = Object.fromEntries(
                new FormData(formRef.value as HTMLFormElement),
              ) as form;

              nav(
                loc.url.pathname +
                  refine(state, {
                    type: "search",
                    value,
                  }),
              );
            }
          }}
        />

        <svg
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="currentColor"
            d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"
          ></path>
        </svg>
      </label>
    </form>
  );
});
