import { component$, useTask$, useSignal } from "@builder.io/qwik";
import { Form, useNavigate } from "@builder.io/qwik-city";
import c from "clsx";

import { useAuth } from "~/routes/auth/sign-in";

import styles from "./style.module.css";

type props = {
  class?: string;
};

export default component$<props>((props) => {
  const action = useAuth();
  const navigate = useNavigate();
  const isPasswordRevealed = useSignal(false);

  useTask$(({ track }) => {
    track(() => action.value);

    if (action.value?.status === "success") {
      navigate("/");
    }
  });

  return (
    <div class={c(props.class, styles.rootX)}>
      <section>
        <Form action={action}>
          <h1>Sign in</h1>

          <fieldset>
            <legend>User details</legend>
            <label>
              <span>phone</span>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="+7999999999"
                required
                minLength={6}
                autoComplete="tel"
              />
            </label>

            <div class={styles.rowX}>
              <label>
                <span>Password</span>
                <input
                  type={isPasswordRevealed.value ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Type password"
                  autoComplete="current-password"
                  minLength={6}
                />
              </label>

              <button
                type="button"
                aria-label="toggle password visibility"
                onClick$={() =>
                  (isPasswordRevealed.value = !isPasswordRevealed.value)
                }
              >
                <svg
                  role="presentation"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1213 15.0381C14.6839 14.4755 15 13.7124 15 12.9167C15 12.1211 14.6839 11.358 14.1213 10.7954C13.5587 10.2328 12.7956 9.91675 12 9.91675C11.2044 9.91675 10.4413 10.2328 9.87868 10.7954C9.31607 11.358 9 12.1211 9 12.9167C9 13.7124 9.31607 14.4755 9.87868 15.0381C10.4413 15.6007 11.2044 15.9167 12 15.9167C12.7956 15.9167 13.5587 15.6007 14.1213 15.0381Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.45801 12.9167C3.73201 8.85975 7.52301 5.91675 12 5.91675C16.478 5.91675 20.268 8.85975 21.542 12.9167C20.268 16.9737 16.478 19.9167 12 19.9167C7.52301 19.9167 3.73201 16.9737 2.45801 12.9167Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </fieldset>

          {action.value?.status === "error" ? (
            <div>Error, try again later</div>
          ) : null}

          <button>Sign in</button>
        </Form>
      </section>
    </div>
  );
});
