import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "../../shared/api/api";
import { useIntersection } from "../../shared/useIntersection";

export function ToDoList() {
  // Code for pagination
  //const [page, setPage] = useState(1);
  //   const {
  //     data: todoData,
  //     error,
  //     isLoading,
  //     isPlaceholderData,
  //   } = useQuery({
  //     queryKey: ["todos", page],
  //     queryFn: (meta) => {
  //       const { signal } = meta;
  //       return todoListApi.getTodos({ page, signal });
  //     },
  //     placeholderData: keepPreviousData,
  //   });

  // Code for infinite Query
  const {
    data: todoData,
    error,
    isLoading,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: (meta) => {
      const { signal, pageParam } = meta;
      return todoListApi.getTodos({ page: pageParam, signal });
    },
    initialPageParam: 1,
    getNextPageParam: (result) => result.next,
    select: (result) => result.pages.flatMap((page) => page.data),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  // Code for pagination
  //   const handlePrev = () => {
  //     setPage((prev) => Math.max(prev - 1, 1));
  //   };

  //   const handleNext = () => {
  //     setPage((prev) => Math.min(prev + 1, todoData?.pages || 1));
  //   };

  if (isLoading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {JSON.stringify(error)}</div>;
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-5">ToDo List</h1>

      <div
        className={
          "flex flex-col gap-4" + (isPlaceholderData ? " opacity-50" : "")
        }
      >
        {todoData?.map((todo) => (
          <div key={todo.id} className="border border-gray-200 rounded p-2">
            {todo.title}
          </div>
        ))}
      </div>
      <div className="text-center" ref={cursorRef}>
        {!hasNextPage && (
          <span className="text-gray-500">
            You have reached the end of the list
          </span>
        )}
        {isFetchingNextPage && (
          <span className="text-gray-500">Loading...</span>
        )}
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
