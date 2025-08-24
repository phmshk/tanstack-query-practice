import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "../api/api";
import { useIntersection } from "./useIntersection";

export function useInfiniteTodoList() {
  const {
    data: todoData,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(todoListApi.getTodosInfiniteQueryOptions());

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div className="text-center" ref={cursorRef}>
      {!hasNextPage && (
        <span className="text-gray-500">
          You have reached the end of the list
        </span>
      )}
      {isFetchingNextPage && <span className="text-gray-500">Loading...</span>}
    </div>
  );

  return { todoData, error, isLoading, cursor };
}
