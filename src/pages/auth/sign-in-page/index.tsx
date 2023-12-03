import { component$, useTask$ } from "@builder.io/qwik";
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

  useTask$(({ track }) => {
    track(() => action.value);

    if (action.value?.status === "success") {
      navigate("/");
    }
  });

  return (
    <div class={c(props.class, styles.rootX)}>
      <Form action={action}>
        <h1>Авторизация</h1>

        <fieldset>
          <legend>Данные пользователя</legend>
          <label>
            <span>Номер телефона</span>
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

          <label>
            <span>Пароль</span>
            <input
              type="password"
              name="password"
              required
              placeholder="Введите пароль"
              autoComplete="current-password"
              minLength={6}
            />
          </label>
        </fieldset>

        {action.value?.status === "error" ? <div>Произошла ошибка</div> : null}

        <button>Войти</button>
      </Form>
    </div>
  );
});
