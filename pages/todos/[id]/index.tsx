import { GetStaticPaths } from 'next';
import { getTodos, Todo } from '..';

function getTodoById(id: string) {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    cache: 'force-cache',
    next: { revalidate: 60, }
  })
    .then(res => res.json())
    .then(res => ({ ...res }));
}

export default function TodoDetail({ todo }: { todo: Todo }) {

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        Todo {todo.title} - {todo.time || 'no time'}
      </main>
    </div>
  );
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const todo = await getTodoById(params.id);

  return {
    props: {
      todo,
    },
  }
}

export const getStaticPaths = (async () => {

    // Call an external API endpoint to get posts
  const todos = await getTodos();
 
  // Get the paths we want to pre-render based on posts
  const paths = todos.map((todo) => ({
    params: { id: todo.id.toString() },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}) satisfies GetStaticPaths