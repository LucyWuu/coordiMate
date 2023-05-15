// import icons as react components
// - FaTimes is the x icon
import {FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete, onToggle}) => {
  return (
    // note that we need "() => onDelete(task.id)" instead of "just onDelete" becasue we want to pass in the id to onDelete
    <div 
    className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
        <h3>
            {task.text} 
            <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)}
            /> 
        </h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task
