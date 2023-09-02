import React from 'react'
import "./styles.css"
import {Todo} from "../model"
import SingleTodo from './SingleTodo'
import { Droppable } from 'react-beautiful-dnd'
type TodosProps= {
 todos:Todo[],
 setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
 completedTodos:Array<Todo>;
 setTodoDone:(id:number) =>void;
 handleDelete:(id:number) =>void;
 setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>;

}
const TodoList = ({todos,setTodoDone,handleDelete,setTodos,completedTodos,setCompletedTodos}:TodosProps) => {
  return (
   <div className="container">
    <Droppable droppableId="TodosList" >
      {
        (provided,snapshot)=>(
          <div
          className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <span className="todos__heading">Active Tasks</span>
          {todos?.map((todo,index)=>{
     
            return (
                    
              <SingleTodo index={index} key={todo.id } todo={todo} setTodoDone={setTodoDone} handleDelete={handleDelete} setTodos={setCompletedTodos} />
  
              )

     
                
          })}
          {provided.placeholder}
      </div>
        )
      }
      </Droppable>
      <Droppable droppableId="TodosRemove" >
      {
        (provided,snapshot)=>(
          <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`todos  ${
            snapshot.isDraggingOver ? "dragcomplete" : "remove"
          }`}
        >
        <span className="todos__heading">Completed Tasks</span>
        {completedTodos?.map((todo,index)=>{

    
          return (
                  
            <SingleTodo index={index} key={todo.id } todo={todo} setTodoDone={setTodoDone} handleDelete={handleDelete} setTodos={setCompletedTodos} />

            )
      
 
        })}
              {provided.placeholder}
    </div>
        )
      }
      </Droppable>
    

   </div>
  )
}

export default TodoList