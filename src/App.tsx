import React,{useState} from 'react';
import './App.css';
import InputField from './components/InputField';
import {Todo} from "./model"
import TodoList from './components/TodoList';
import { DragDropContext,DropResult } from "react-beautiful-dnd";
const App=()=> {
const [todo, setTodo] = useState<string>("")
const [todos, setTodos] = useState<Todo[]>([])
const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
const handleChange=(todo:string): void=> {
  console.log(todo);
  
  setTodo(todo)
}
const handleAddtodo=(e:React.FormEvent)=> {
e.preventDefault()
  
  todo && setTodos([...todos,{id:Date.now(),todo:todo,isCompleted:false}])
  setTodo("")
}

const handleDelete=(id:number):void=>{
  setTodos((prevState:Todo[])=>{

    return  prevState.filter(todo=>todo.id!==id)
  })

}
const setTodoDone=(id:number):void=>{
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    )
  );
}
const onDragEnd = (result: DropResult) => {
  const { destination,source } = result;

  console.log("Result :" + result);

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  let add;
  let active = todos;
  let complete = completedTodos;
  // Source Logic
  if (source.droppableId === "TodosList") {
    add = active[source.index];
    active.splice(source.index, 1);
  } else {
    add = complete[source.index];
    complete.splice(source.index, 1);
  }

  // Destination Logic
  if (destination.droppableId === "TodosList") {
    active.splice(destination.index, 0, add);
  } else {
    complete.splice(destination.index, 0, add);
  }

  setCompletedTodos(complete);
  setTodos(active);
  console.log(todos);
  console.log(complete);
};


  return (
  <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
    <span className="heading">Taskify</span>
    <InputField todo={todo} handleChange={handleChange} handleAddtodo={handleAddtodo} />
    <TodoList todos={todos} setTodoDone={setTodoDone} handleDelete={handleDelete} setTodos={setTodos} setCompletedTodos={setCompletedTodos} completedTodos={completedTodos} />
    </div>
  </DragDropContext>
  );
}

export default App;
