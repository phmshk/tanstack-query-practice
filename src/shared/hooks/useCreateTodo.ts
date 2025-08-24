import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "../api/api";
import { nanoid } from "nanoid";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("text") as string;

    createTodoMutation.mutate({
      id: nanoid(),
      title: text,
      completed: false,
      userId: "u1",
    });

    e.currentTarget.reset();
  };

  return { handleCreate, isPending: createTodoMutation.isPending };
}
