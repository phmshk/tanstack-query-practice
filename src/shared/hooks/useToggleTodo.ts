import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi, type TodoDto } from "../api/api";

export function useToggleTodo() {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: (newTodo: TodoDto) =>
      todoListApi.updateTodo(newTodo.id, newTodo),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: [todoListApi.baseKey] });

      const previousTodos = queryClient
        .getQueryData(todoListApi.getAllTodosQueryOptions().queryKey)
        ?.reverse();

      queryClient.setQueryData(
        todoListApi.getAllTodosQueryOptions().queryKey,
        (old) =>
          old?.map((todo) =>
            todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
          )
      );

      return { previousTodos };
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          todoListApi.getAllTodosQueryOptions().queryKey,
          context.previousTodos
        );
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] }),
  });

  const toggleTodo = (todo: TodoDto) => {
    updateTodoMutation.mutate({
      ...todo,
      completed: !todo.completed,
    });
  };

  return { toggleTodo };
}
