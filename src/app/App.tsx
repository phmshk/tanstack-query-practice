import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/queryClient";
import { ToDoList } from "../features/todoList/ToDoList";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToDoList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
