import { Link } from "react-router-dom"

import "./style/taskitem.css"
const TaskItem = ({user, task, onToggle, onDelete}) => {

  return (
         <li className="taskitem">
                        <div className="taskleft">
                          <h3
                        style={{
                  textDecoration: task.completed ? "line-through": "none",
                  opacity: task.completed ? "0.7": "1"

                        }}
                        >Task: {task.text}</h3>
                        <h4>User:  {user ? user.name : "Unknown User"}</h4>
                        </div>
                        
                        <div className="taskright">
                           <Link className="view-details" to={`/task/${task.id}`}>View Details</Link>
                        <button className=" togglebtn " onClick={() => onToggle(task.id)}> {task.completed ? <p className="completed">completed</p>: <p className="undo">Pending</p>}</button>
                        <button className=" deletebtn taskitembtns" onClick={() => onDelete(task.id)}>Delete</button>
                        </div>
                    </li>
  )
}

export default TaskItem