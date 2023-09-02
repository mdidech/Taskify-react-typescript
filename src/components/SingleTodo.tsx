import React,{useEffect, useRef, useState} from 'react'
import {Todo} from '../model'
import { AiFillEdit,AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './styles.css'
import { Draggable } from 'react-beautiful-dnd';

type TodoProps={
 todo:Todo,
 setTodoDone: (id:number)=>void,
 handleDelete:(id:number) =>void;
 setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
 index:number;
 }
const SingleTodo = ({todo,setTodoDone,handleDelete,setTodos,index}:TodoProps) => {
     const [isEdit, setIsEdit] = useState<boolean>(false)
     const [editTodo, setEditTodo] = useState<string>(todo.todo)

     const handleEdit=(e:React.FormEvent,editedTodo:Todo):void=>{
          e.preventDefault();
          setTodos((prevState)=>{
              console.log(prevState);
              
              return  prevState.map((todo) =>
              todo.id === editedTodo.id ? { ...todo, todo: editTodo } : todo
              )
          }
            )
            setIsEdit(false);
          }
const inputRef=useRef<HTMLInputElement>(null)
useEffect(()=>{
     inputRef.current?.focus()
},[isEdit])
  return (
     <Draggable draggableId={todo.id.toString()} index={index}>
          {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
 {
      isEdit ? (
           <input ref={inputRef} className="todos__single--text" value={editTodo} onChange={(e)=>{setEditTodo(e.target.value)}} />
      ):todo.isCompleted ? (

           <s className="todos__single--text">{todo.todo}</s>
                ):(
           <span className="todos__single--text">{todo.todo}</span>
           
                )
 }
<div>
<span className="icon" onClick={()=>{
  if(!isEdit && !todo.isCompleted){
      setIsEdit(!isEdit)
 }else{

 }
}

}><AiFillEdit /> </span>
<span className="icon"><AiFillDelete onClick={()=>handleDelete(todo.id)} /></span>
<span className="icon" ><MdDone onClick={()=>setTodoDone(todo.id)} /> </span>
</div>
</form>
          )}
   
    </Draggable>)
}

export default SingleTodo