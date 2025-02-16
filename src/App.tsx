import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const onUpdateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };
  const [count, setCount] = useState(0)

  return (
    <>

      <TaskList tasks={tasks} onUpdateTasks={onUpdateTasks}></TaskList>
    </>
  )
}

export default App
