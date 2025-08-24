import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "../api/api";

export function useAllTodoItems() {
  const {
    data: todoData,
    error,
    isLoading,
  } = useQuery({
    ...todoListApi.getAllTodosQueryOptions(),
    select: (data) => data.reverse(),
  });

  return {
    todoData,
    error,
    isLoading,
  };
}
