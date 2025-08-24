import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "../api/api";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
    },
    onSuccess: (_, deletedId) => {
      const todos = queryClient.getQueryData(
        todoListApi.getAllTodosQueryOptions().queryKey
      );
      if (todos) {
        queryClient.setQueryData(
          todoListApi.getAllTodosQueryOptions().queryKey,
          todos.filter((todo) => todo.id !== deletedId).reverse()
        );
      }
    },
  });

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  return {
    handleDelete,
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
  };
}
