import { useAllTodoItems } from "../../shared/hooks/useAllTodoItems";
import { useCreateTodo } from "../../shared/hooks/useCreateTodo";

export function ToDoList() {
  // const [page, setPage] = useState(1);

  const { todoData, error, isLoading } = useAllTodoItems();

  const { handleCreate } = useCreateTodo();

  if (isLoading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  // Pagination Controls
  // const handlePrev = () => {
  //   setPage((prev: number) => Math.max(prev - 1, 1));
  // };

  // const handleNext = () => {
  //   setPage((prev: number) => Math.min(prev + 1, todoData?.pages || 1));
  // };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-5">ToDo List</h1>

      <form className="flex gap-2 mb-4" onSubmit={handleCreate}>
        <input
          type="text"
          name="text"
          className="border border-gray-300 rounded p-2 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 cursor-pointer"
        >
          Create
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {todoData?.map((todo) => (
          <div key={todo.id} className="border border-gray-200 rounded p-2">
            {todo.title}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {/* <div className="flex justify-between mt-4 items-center">
        <button
          onClick={handlePrev}
          className="border border-gray-300 rounded px-4 py-2 cursor-pointer disabled:opacity-50"
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="text-gray-600">
          Page {page} of {todoData?.pages}
        </span>

        <button
          onClick={handleNext}
          className="border border-gray-300 rounded px-4 py-2 cursor-pointer disabled:opacity-50"
          disabled={page === todoData?.pages}
        >
          Next
        </button>
      </div> */}
    </main>
  );
}
