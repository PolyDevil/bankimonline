import {
  component$,
  useSignal,
  useVisibleTask$,
  useStore,
  useContext,
} from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { Context, refine, Sorting } from "~/utils/SearchParams";
import { KEY } from "~/utils/Keyboard";
import styles from "./styles.module.css";

type props = {
  class?: string;
};

const name = "sorting";
const id = "sortingForm";

type form = Record<typeof name, Sorting.t>;

export default component$((props: props) => {
  const nav = useNavigate();
  const loc = useLocation();
  const state = useContext(Context);
  const sorting = useStore(Sorting.map[state.sorting]);
  const dialogRef = useSignal<HTMLDialogElement>();

  useVisibleTask$(({ cleanup }) => {
    const onClose = () => {
      const formNode = document.querySelector(`#${id}`);

      if (formNode) {
        const { sorting: value } = Object.fromEntries(
          new FormData(formNode as HTMLFormElement),
        ) as form;

        nav(
          loc.url.pathname +
            refine(state, {
              type: "sorting",
              value,
            }),
        );
      }
    };

    dialogRef.value!.addEventListener("close", onClose);

    const onKeyDown = (e: KeyboardEvent) => {
      switch (true) {
        case (e.target as HTMLInputElement).name === "sortingName": {
          switch (e.keyCode) {
            case KEY.Enter.keyCode:
            case KEY.Space.keyCode: {
              e.preventDefault();
              const rect = (
                e.target as HTMLInputElement
              ).getBoundingClientRect();

              dialogRef.value!.style.setProperty(
                "--inline-size",
                rect.width + "px",
              );
              dialogRef.value!.style.setProperty(
                "inset-block-start",
                rect.height + rect.y + "px",
              );
              dialogRef.value!.style.setProperty(
                "inset-inline-start",
                rect.x + "px",
              );
              dialogRef.value?.showModal();

              const formNode = document.querySelector(`#${id}`);
              if (formNode) {
                (
                  formNode.querySelector("input:checked") as HTMLInputElement
                ).focus();
              }
              return;
            }
            case KEY.ArrowUp.keyCode:
            case KEY.ArrowLeft.keyCode: {
              e.preventDefault();
              const v = Sorting.map[sorting.value];
              sorting.value = v.prev;
              sorting.name = Sorting.map[v.prev].name;

              return;
            }
            case KEY.ArrowDown.keyCode:
            case KEY.ArrowRight.keyCode: {
              e.preventDefault();
              const v = Sorting.map[sorting.value];
              sorting.value = v.next;
              sorting.name = Sorting.map[v.next].name;

              return;
            }
            default: {
              return;
            }
          }
        }
        case document
          .querySelector(`#${id}`)
          ?.contains(e.target as HTMLElement): {
          switch (e.keyCode) {
            case KEY.Enter.keyCode:
            case KEY.Space.keyCode:
            case KEY.Escape.keyCode: {
              e.preventDefault();
              return void dialogRef.value!.close();
            }
            default: {
              return;
            }
          }
        }
        default: {
          return;
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    cleanup(() => {
      document.removeEventListener("keydown", onKeyDown);
      dialogRef.value!.removeEventListener("close", onClose);
    });
  });

  return (
    <form
      class={styles.rootX + " " + props.class}
      id={id}
      preventdefault:submit
    >
      <label>
        <span>
          <b>sorting</b>
          <svg
            role="presentation"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 17L19 13M1 1H14H1ZM1 5H10H1ZM1 9H10H1ZM15 5V17V5ZM15 17L11 13L15 17Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <input
          autoComplete="off"
          readOnly={true}
          role="combobox"
          type="text"
          name="sortingName"
          value={`Sorting: by ${sorting.name}`}
          onClick$={() => {
            const rect = (
              document
                .querySelector(`#${id}`)
                ?.querySelector("label") as HTMLLabelElement
            ).getBoundingClientRect();

            dialogRef.value!.style.setProperty(
              "--inline-size",
              rect.width + "px",
            );
            dialogRef.value!.style.setProperty(
              "inset-block-start",
              rect.height + rect.y + "px",
            );
            dialogRef.value!.style.setProperty(
              "inset-inline-end",
              window.innerWidth - rect.right + "px",
            );
            dialogRef.value?.showModal();

            const formNode = document.querySelector(`#${id}`);
            if (formNode) {
              (
                formNode.querySelector("input:checked") as HTMLInputElement
              ).focus();
            }
          }}
        />
      </label>

      <dialog
        ref={dialogRef}
        onClick$={(e) => {
          if ((e.target as HTMLDialogElement).tagName === "DIALOG") {
            return void dialogRef.value!.close();
          }
        }}
      >
        <fieldset>
          <legend>sorting</legend>
          {Sorting.options.map((option) => (
            <label
              key={option.value}
              onMouseUp$={() => void dialogRef.value!.close()}
            >
              <span>{option.name}</span>
              <input
                type="radio"
                id={option.value}
                name={name}
                value={option.value}
                checked={option.value === sorting.value}
                onChange$={(e) => {
                  const v = e.target.value as Sorting.t;
                  sorting.value = v;
                  sorting.name = Sorting.map[v].name;
                }}
              />
            </label>
          ))}
        </fieldset>
      </dialog>
    </form>
  );
});
