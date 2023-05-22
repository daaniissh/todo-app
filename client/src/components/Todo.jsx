import "./Todo.css";
import { TodoList } from "./TodoList";
import { useEffect, useRef, useState } from "react";
import { TodoInput } from "./TodoInput";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
export const Todo = () => {
    const inputTodoRef = useRef(null);
    const editInputRef = useRef();
    const [selectedId, setSelectedId] = useState(0);
    const [editInput, setEditInput] = useState("");
    const [todo, setTodo] = useState([]);
    const [inputValue, setInputValue] = useState("");
    //API url
    const API_TODO = "http://localhost:4444/todo"
    const API_TODO_ADD = "http://localhost:4444/add-todo"
    const API_TODO_DELETE = "http://localhost:4444/delete-todo"
    const API_TODO_COMPLETE = "http://localhost:4444/complete-todo"
    const API_TODO_EDIT = "http://localhost:4444/edit-todo"
    //OnMount gets all the todos from local storage and set to todo
    const fetchTodoData = async () => {
        const response = await axios.get(API_TODO)
        const data = response.data
        setTodo(data)
    }
    useEffect(() => {
        fetchTodoData()
    }, []);

    //handleChange the Input todo
    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    };
    //add todo and update state
    const addTodo = async () => {
        const response = await axios.post(API_TODO_ADD, {
            data: {
                todoName: inputValue
            }
        })
        const data = await response.data
        setTodo(data);
        setInputValue("");

    };


    //press enter to add todo
    const handleEnter = (event) => {
        const { key } = event;
        if (key == "Enter") {
            addTodo();
        }
    };

    //edit Button
    const editTodo = (id) => {
        setSelectedId(id);
        let editingTodo = todo.filter((tod) => tod?.id === id);
        editingTodo.forEach((EditingElement) => {
            setEditInput(EditingElement?.todo);
        });
  
    };
    //editAndSave
    const editAndSave = (id) => {
        axios.put(API_TODO_EDIT, {
            data: {
                id: id,
                todoName: editInput
            }
        }).then((res) => setTodo(res.data))
        // setTodo(updatedTodo);
        setSelectedId();
    };
    //completeTodo
    const completeTodo = async (id) => {
        const response = await axios.put(API_TODO_COMPLETE, {
            id: id
        })
        const complete = response.data;

        setTodo(complete);
    };

    //delete todo and then update localstorage and state
    const deleteTodo = async (id) => {
        const response = await axios.delete(API_TODO_DELETE, {
            data: { id }

        })
        const undeleted = response.data
        setTodo(undeleted);
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <div className="todo-input-container">
                <TodoInput

                    handleInputValue={handleInputValue}
                    inputValue={inputValue}
                    handleEnter={handleEnter}
                    inputTodoRef={inputTodoRef}
                />
                <button onClick={() => addTodo()} className="add-todo-button">
                    ADD TODO
                </button>
            </div>
            <div className="todo-list-container">
                <TodoList
                    editInputRef={editInputRef}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    editInput={editInput}
                    setEditInput={setEditInput}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    editAndSave={editAndSave}
                    completeTodo={completeTodo}
                />
            </div>
        </div>
    );
};
