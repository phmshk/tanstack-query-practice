import { useQuery } from "@tanstack/react-query";

import { todoListApi } from "../api/api";

export function usePageTodoList({ page }: { page: number }) {
  const {
    data: todoData,
    error,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    ...todoListApi.getTodosQueryOptions({ page }),
  });

  return {
    todoData,
    error,
    isLoading,
    isPlaceholderData,
  };
}
