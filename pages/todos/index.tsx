// Create a ts model interface for the above object
export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    time?: string;
}

export default function TodosPage({ todos }: { todos: Todo[] }) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <h1 className="text-2xl font-bold">Todos Page</h1>
            <div className="flex flex-col gap-4">
              {todos.map((todo) => (
                <div key={todo.id} className="p-4 border rounded">
                  <h3 className="font-semibold">{todo.title}</h3>
                  <p className="text-sm text-gray-600">
                    Status: {todo.completed ? 'Completed' : 'Pending'}
                  </p>
                </div>
              ))}
            </div>
        </main>
    </div>
  );
}

export async function getTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', { 
    next: { revalidate: 60 }});
  const todos: Todo[] = await res.json();
  return todos.map(todo => ({ ...todo, time: Date.now().toString() }));
}

export async function getStaticProps() {
  // Call an external API endpoint to get todos
  const todos = await getTodos();

  // By returning { props: { todos } }, the TodosPage component
  // will receive `todos` as a prop at build time
  return {
    props: {
      todos: todos.slice(0, 10), // Limit to 10 records
    },
  }
}
