//Referencias al html

import { Todo, TodoList } from "../classes";
import { Todolist, todoList } from "../index";
const divTodoList=document.querySelector('.todo-list');
const txtinput=document.querySelector('.new-todo');
const btnBorrar=document.querySelector('.clear-completed');
const ulFiltros =document.querySelector('.filters');
const anchorFiltros =document.querySelectorAll('.filtro');

export const crearTodoHTLM=(todo)=>{
    const htmlTodo = `<li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div =document.createElement('div');
    div.innerHTML=htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div;
}

//eventos
txtinput.addEventListener('keyup',(event)=>{
    // console.log(event);
    if (event.keyCode===13 && txtinput.value.length>0) {
        console.log(txtinput.value);
        const nuevoTodo=new Todo(txtinput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTLM(nuevoTodo);
        txtinput.value='';
    }
});


divTodoList.addEventListener('click',(event)=>{
    console.log("click");
    console.log(event.target.localName); //para saber a que elemento le da click sirve este codigo
    const nombreElemento=event.target.localName;
    const todoElement=event.target.parentElement.parentElement;
    const todoId =todoElement.getAttribute('data-id');
    
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElement.classList.toggle('completed')
    }else if(nombreElemento.includes('button')){ //aqui hay que borrar el todo
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElement);
        
    }
    
});

btnBorrar.addEventListener('click',()=>{
    todoList.eliminarCompletado();

    //aqui abajo eliminaremos las tareas de abajo hacia arriba
    for (let i = divTodoList.children.length-1; i>=0; i--) {
        
        const elemento=divTodoList.children[i] //esto es para saber que elemento osea la tarea estoy recuperando
        
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
        
    }
});

ulFiltros.addEventListener("click",(event)=>{
    console.log(event.target.text);
    const filtro=event.target.text;
    if(!filtro){
        return;
    }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected')
    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtro)
        {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
})