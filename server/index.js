const express = require("express");
const cors = require("cors");
const app = express();
const port = 4444;
app.use(express.json());
app.use(cors());

//list of todos
let TodoList = [
  {
    id: 1,
    todo: "Hello every body!",
    isCompleted: false,
  },
];
//show todo all contents
app.get("/todo", (req, res) => {
  res.json(TodoList);
});
//add a new todo
app.post("/add-todo", (req, res) => {
  const { todoName } = req.body.data;
  console.log(req.body);
  const prevId = TodoList.at(-1).id;
  if (todoName) {
    let newTodo = {
      id: prevId + 1,
      todo: todoName,
      isCompleted: false,
    };

    TodoList.push(newTodo);
  }
  res.json(TodoList);
});
//delete todoList
app.delete("/delete-todo", (req, res) => {
  const { id } = req.body;
  const filteredTodo = TodoList.filter((item) => item.id != id);
  TodoList = filteredTodo;
  res.json(TodoList);
});
//is completed todo list
app.put("/complete-todo", (req, res) => {
  const { id } = req.body;
  console.log(id);
  let currentTodo = TodoList.findIndex((todo) => todo.id == id);
  let todoCompleted = TodoList[currentTodo];
  let result = todoCompleted.isCompleted;
  result
    ? (todoCompleted.isCompleted = false)
    : (todoCompleted.isCompleted = true);
  res.json(TodoList);
});
//edit todo
app.put("/edit-todo", (req, res) => {
  const { id, todoName } = req.body.data;
  let currentTodo = TodoList.findIndex((todo) => todo.id == id);
  let todo = TodoList[currentTodo];
  if (todo) {
    todo.todo = todoName;
  }
  res.json(TodoList);
});
app.put("/");
app.listen(port, () => {
  console.log(port, "server started");
});
