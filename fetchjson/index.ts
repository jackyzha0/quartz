import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
    id: number; // Id of the note (not userId, as userId is ignored)
    title: string;
    completed: boolean;
}

axios.get(url).then(response => {
    // Called when we get a response from the API
    // response.data properties: `id`, `title`, `completed`
    const todo = response.data as Todo;
    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;

    logTodo(id, title, completed);
});

const logTodo = (id: number, title: string, completed: boolean) => {
    console.log(`
        The Todo with ID: ${id}
        Has a title of: ${title}
        Is it finished? ${completed}
    `);
}