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
};
