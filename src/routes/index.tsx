import {
  $,
  component$,
  useStore,
  useContextProvider,
  useTask$,
} from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";

import {
  SearchResponse,
  type t,
  parse,
  Sorting,
  Context,
} from "~/utils/SearchParams";

import ToError from "~/utils/Error";
import Page from "~/pages/home-page";

const fetchData = $(async (body: SearchResponse.body) => {
  try {
    const res = await SearchResponse.api(body);

    if (res.ok) {
      const data: SearchResponse.t = await res.json();

      if ("data" in data) {
        return {
          state: {
            page: data.page,
            pages: Math.ceil(data.total / data.pageSize),
            pageSize: data.pageSize,
            sorting: body.sorting as Sorting.t,
            search: data.query,
          },
          list: data.data,
        };
      }
    }

    throw new Error("no data");
  } catch (maybeError: unknown) {
    return {
      errorMessage: ToError(maybeError).message,
    };
  }
});

const syncDataFromURL = async (searchParams: URLSearchParams) => {
  const params = parse(searchParams);

  return await fetchData({
    q: params.search,
    page: params.page,
    pageSize: params.pageSize,
    sorting: Sorting.toQuery(params.sorting),
  });
};

export const use = routeLoader$(({ url }) => syncDataFromURL(url.searchParams));

export default component$(() => {
  const d = use();
  const loc = useLocation();
  const store = useStore<t>({
    ...parse(loc.url.searchParams),
    list: d.value.list || [],
  });
  useContextProvider(Context, store);

  useTask$(() => {
    if (d.value.state) {
      store.page = d.value.state.page;
      store.pageSize = d.value.state.pageSize;
      store.pages = d.value.state.pages;
      store.sorting = d.value.state.sorting;
      store.search = d.value.state.search;
    }
  });

  useTask$(async ({ track }) => {
    track(() => loc.url);
    const newState = parse(loc.url.searchParams);

    if (d.value.state) {
      if (
        store.page !== newState.page ||
        store.sorting !== newState.sorting ||
        store.search !== newState.search
      ) {
        const nextChunkOfList = await syncDataFromURL(loc.url.searchParams);

        if (nextChunkOfList.list) {
          store.list = nextChunkOfList.list;
          store.page = nextChunkOfList.state.page;
          store.pages = nextChunkOfList.state.pages;
          store.sorting = nextChunkOfList.state.sorting;
          store.search = nextChunkOfList.state.search || "";
        }
      }
    }
  });

  if ("errorMessage" in d.value) {
    return <>{d.value.errorMessage}</>;
  }

  return <Page />;
});

export const head: DocumentHead = {
  title: "Bankimonline Тестовое задание",
};
