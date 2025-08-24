import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";
import { jsonApiInstance } from "./apiInstance";

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
  id: string;
  title: string;
  completed: boolean;
  userId: string;
};

export const todoListApi = {
  baseKey: "todos",
  getAllTodosQueryOptions: () => {
    return queryOptions({
      queryKey: [todoListApi.baseKey],
      queryFn: (meta) =>
        jsonApiInstance<TodoDto[]>(`/todos`, {
          signal: meta.signal,
        }),
    });
  },

  getTodosQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, page],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/todos?_page=${page}&_per_page=10`,
          {
            signal: meta.signal,
          }
        ),
      placeholderData: keepPreviousData,
    });
  },

  getTodosInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: [todoListApi.baseKey],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/todos?_page=${meta.pageParam}&_per_page=10`,
          {
            signal: meta.signal,
          }
        ),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  },

  createTodo: (data: TodoDto) =>
    jsonApiInstance<TodoDto>("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  updateTodo: (id: string, data: TodoDto) =>
    jsonApiInstance<TodoDto>(`/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  deleteTodo: (id: string) =>
    jsonApiInstance(`/todos/${id}`, {
      method: "DELETE",
    }),
};
