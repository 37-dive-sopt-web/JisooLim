const input = document.querySelector('.input');
const button = document.querySelector('.button');
const list = document.querySelector('.list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo;
    list.appendChild(li);
});

button.addEventListener('click', () => {
    const todoText = input.value;
    if (!todoText) return;
    const li = document.createElement('li');
    li.textContent = todoText;
    list.appendChild(li);
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
    input.value = '';
});


