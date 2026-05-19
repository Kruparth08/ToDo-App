//get elements
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const addBtn = document.getElementById("add-btn");

//Try to load saved Todo
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved): [];

//save todo to localstorage
function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//create node for todo
function createTodoNode(todo, index) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;

    //strike through when completed

    textSpan.style.textDecoration = todo.completed ? "line-through" : "";
    saveTodo();
  });

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.style.margin = "0 8px";

  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit todo", todo.text);
    if (newText !== null) {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      saveTodo();
    }
  });

  // Delete todo
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    render();
    saveTodo();
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);
  return li;
}

//render the todo list
function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);

    list.appendChild(node);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) {
    return;
  }

  todos.push({ text, completed: false });
  input.value = "";
  render();
  saveTodo();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key == 'Enter') {
    addTodo();
  }
});
render();
