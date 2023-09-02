import React,{useRef} from 'react';
import "./styles.css";

type TodoProps={
 todo:string,
 handleChange:Function,
 handleAddtodo:(e:React.FormEvent)=>void
}
const InputField = ({todo,handleChange,handleAddtodo}:TodoProps) => {
 const inputRef = useRef<HTMLInputElement>(null)
  return (
    <form className="input" onSubmit={(e)=>{
     handleAddtodo(e)
     inputRef.current?.blur()
    }}>
<input ref={inputRef} value={todo} onChange={(e)=>handleChange(e.target.value)} type="text" placeholder='Enter a task' className="input__box" />
<button className="input_submit" type="submit">Go</button>
    </form>
  )
}

export default InputField