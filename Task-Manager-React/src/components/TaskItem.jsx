import { Link } from "react-router-dom"


const TaskItem = ({user, task, onToggle, onDelete}) => {

  return (
         <li className="taskitem">
                        <h3
                        style={{
                  textDecoration: task.completed ? "line-through": "none"

                        }}
                        >Task name: {task.text}</h3>
                        <h4>UserName:  {user ? user.name : "Unknown User"}</h4>
                      <Link to={`/task/${task.id}`}>view Details</Link>
                        <button onClick={() => onToggle(task.id)}>toggle</button>
                        <button onClick={() => onDelete(task.id)}>delete</button>
                    </li>
  )
}

export default TaskItem