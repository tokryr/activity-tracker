import { useEffect, useState } from 'react';
import './App.css';
import PomodoroTimer from './components/PomodoroTimer';
import TaskList from './components/TaskList';
import Auth from './components/Auth';
import { auth } from './services/firebase';
import { getTasks, addTask, updateTask } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const userId = auth?.currentUser?.uid;

  useEffect(() => {
    const fetchTasks = async () => {
      const taskList = await getTasks();
      setTasks(taskList);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (newTask: Task) => {
    await addTask({ ...newTask, userId });
    setTasks(await getTasks());
  };

  const handleUpdateTask = async (taskId: string, updatedFields: Partial<Task>) => {
    await updateTask(taskId, updatedFields);
    setTasks(await getTasks());
  };

  const logActivity = (activityType: string, startTime: Date, duration: number) => {
    const endTime = new Date(startTime.getTime() + duration * 60000);
    console.log(`Logging ${activityType}: ${startTime.toISOString()} - ${endTime.toISOString()}`);
  };

  return (
    <>
      <Auth />
      <PomodoroTimer logActivity={logActivity} />
      <TaskList tasks={tasks} onUpdateTask={handleUpdateTask} onAddTask={handleAddTask} />
    </>
  );
}

export default App;
