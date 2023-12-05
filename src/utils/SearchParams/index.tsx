import { z } from "zod";
import { createContextId } from "@builder.io/qwik";

export namespace Sorting {
  export type t = "id" | "name" | "attack" | "defense";
  export const defaultValue: t = "id";

  type option = {
    name: string;
    value: t;
    prev: t;
    next: t;
  };

  export const options: Array<option> = [
    {
      name: "id",
      value: "id",
      prev: "defense",
      next: "name",
    },
    {
      name: "name",
      value: "name",
      prev: "id",
      next: "attack",
    },
    {
      name: "attack",
      value: "attack",
      prev: "name",
      next: "defense",
    },
    {
      name: "defense",
      value: "defense",
      prev: "attack",
      next: "id",
    },
  ];

  export const map: Record<t, option> = {
    id: options[0],
    name: options[1],
    attack: options[2],
    defense: options[3],
  };

  export const toQuery = (t: t) => {
    switch (t) {
      case "id": {
        return "id";
      }
      case "name": {
        return "name";
      }
      case "attack": {
        return "attack";
      }
      case "defense": {
        return "defense";
      }
      default: {
        return defaultValue;
      }
    }
  };
}

export namespace SearchResponse {
  export type hit = {
    attack: number;
    attackSpeed: number;
    defense: number;
    defenseSpeed: number;
    generation: number;
    hp: number;
    hpTotal: number;
    id: number;
    isLegendary: boolean;
    name: string;
    type1: string;
    type2: string;
  };

  export type t = {
    data: Array<hit>;
    page: number;
    pageSize: number;
    total: number;
    query: string;
  };

  export type body = {
    q: string;
    page: number;
    pageSize: number;
    sorting: string;
  };

  export const api = (body: body) => {
    return fetch("https://polydevil-bankimonline.builtwithdark.com/pokemon", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };
}

const Params = z.object({
  page: z.coerce.number().positive().optional(),
  pages: z.coerce.number().positive().optional(),
  pageSize: z.coerce.number().positive().optional(),
  search: z.string().optional(),
});

export type maybeT = z.infer<typeof Params> & {
  sorting: Sorting.t;
};
export type t = Required<maybeT> & {
  list: Array<SearchResponse.hit>;
};

export const defaultState: t = {
  page: 1,
  pages: 1,
  pageSize: 6,
  sorting: Sorting.defaultValue,
  search: "",
  list: [],
};

export const Context = createContextId<t>("searchParams");

export const parse = (searchParams: URLSearchParams) => {
  return {
    page: searchParams.get("page")
      ? Number(searchParams.get("page"))
      : defaultState.page,
    pages: 1, // #todo - pls look up later - maybe ssr and csr are different
    pageSize: defaultState.pageSize,
    sorting: searchParams.has("sorting")
      ? (searchParams.get("sorting") as Sorting.t)
      : defaultState.sorting,
    search: searchParams.get("search") ?? defaultState.search,
  };
};

export class Refine {
  static query(t: t) {
    const a = [];

    if (t.search !== defaultState.search) {
      a.push(`search=${t.search}`);
    }

    if (t.sorting !== defaultState.sorting) {
      a.push(`sorting=${t.sorting}`);
    }

    if (t.page !== defaultState.page) {
      a.push(`page=${t.page}`);
    }

    if (t.pageSize !== defaultState.pageSize) {
      a.push(`pageSize=${t.pageSize}`);
    }

    if (a.length > 0) {
      return "?" + a.join("&");
    }

    return "";
  }
}

type params =
  | {
      type: "search";
      value: string;
    }
  | {
      type: "sorting";
      value: Sorting.t;
    }
  | {
      type: "page";
      value: number;
    };

export const refine = (state: t, params: params) => {
  switch (params.type) {
    case "search": {
      return Refine.query({
        ...state,
        search: params.value,
      });
    }
    case "sorting": {
      return Refine.query({
        ...state,
        sorting: params.value,
      });
    }
    case "page": {
      return Refine.query({
        ...state,
        page: params.value,
      });
    }

    default: {
      return "";
    }
  }
};
