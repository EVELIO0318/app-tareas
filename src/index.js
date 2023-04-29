// import { saludar } from './js/componentes.js';


import {Todo,TodoList} from './classes';
import { crearTodoHTLM } from './js/componentes';
import './styles.css'

export const todoList= new TodoList();
todoList.todos.forEach(todo => {
    crearTodoHTLM(todo);
});
// const tarea = new Todo("Aprender Javascript");

// todoList.nuevoTodo(tarea);

// todoList.todos[0].imprimirClase();

// console.log('todos',todoList.todos);

// crearTodoHTLM(tarea);

localStorage.setItem('myKey','ABC123');