import { useLoaderData } from '@tanstack/react-router';
import { useState } from 'react';
import TaskBoard from '@/components/TaskBoard';
import PomodoroTimer from '@/components/PomodoroTimer';
import { addTask, updateTask, getTasks } from '@/services/taskService';

const FocusPage = () => {
  // Loader data provides initial tasks
  const { tasks: initialTasks } = useLoaderData({ from: '/focus' });
  const [tasks, setTasks] = useState(initialTasks);

  const handleAddTask = async (newTask: Task) => {
    await addTask(newTask);
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  const handleUpdateTask = async (taskId: string, updatedFields: Partial<Task>) => {
    await updateTask(taskId, updatedFields);
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };
  const logActivity = (activityType: string, startTime: Date, duration: number) => {
    const endTime = new Date(startTime.getTime() + duration * 60000);
    console.log(`Logging ${activityType}: ${startTime.toISOString()} - ${endTime.toISOString()}`);
  };

  return (
    <div>
      <PomodoroTimer logActivity={logActivity} />
      <TaskBoard tasks={tasks} onAddTask={handleAddTask} onUpdateTask={handleUpdateTask} />
    </div>
  );
};

export default FocusPage;
