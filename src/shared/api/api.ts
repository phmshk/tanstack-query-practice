import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

const BASE_URL = "http://localhost:3000";

export type PaginatedResult<T> = {
  first: number;
  last: number;
  pages: number;
  prev: number | null;
  next: number | null;
  items: number | null;
  data: T[];
};

export type TodoDto = {
  id: number;
  title: string;
  completed: boolean;
};

interface IGetTodos {
  page: number;
  signal: AbortSignal;
}

export const todoListApi = {
  getTodos: (options: IGetTodos) => {
    const { page, signal } = options;
    return fetch(`${BASE_URL}/todos?_page=${page}&_per_page=10`, {
      signal,
    }).then((res) => res.json() as Promise<PaginatedResult<TodoDto>>);
  },

  getTodosQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ["todos", page],
      queryFn: (meta) => {
        const { signal } = meta;
        return todoListApi.getTodos({ page, signal });
      },
      placeholderData: keepPreviousData,
    });
  },

  getTodosInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["todos"],
      queryFn: (meta) => {
        const { signal, pageParam } = meta;
        return todoListApi.getTodos({ page: pageParam, signal });
      },
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  },
};
