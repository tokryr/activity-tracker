import { useState } from 'react'
import './App.css'
import PomodoroTimer from './components/PomodoroTimer'
import TaskList from './components/TaskList';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const onUpdateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };



  const logActivity = (activityType: string, startTime: Date, duration: number) => {
    const endTime = new Date(startTime.getTime() + duration * 60000);
    console.log(`Logging ${activityType}: Start at ${startTime.toISOString()}, End at ${endTime.toISOString()}`);
    // TODO: Save data upstream
  };


  return (
    <>
      <PomodoroTimer logActivity={logActivity}></PomodoroTimer>
      <TaskList tasks={tasks} onUpdateTasks={onUpdateTasks}></TaskList>
    </>
  )
}

export default App
