import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/queryClient";
import { ToDoList } from "../features/todoList/ToDoList";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToDoList />
    </QueryClientProvider>
  );
}

export default App;
