import { useLoaderData } from '@tanstack/react-router';
import { useState } from 'react';
import TaskBoard from '@/components/TaskBoard';
import PomodoroTimer from '@/components/PomodoroTimer';
import { addTask, updateTask, getTasks, setActiveTask } from '@/services/taskService';

const FocusPage = () => {
  // Loader data provides initial tasks and active task ID
  const { tasks: initialTasks, activeTaskId: initialActiveTaskId } = useLoaderData({
    from: '/focus',
  });
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTaskId, setActiveTaskId] = useState(initialActiveTaskId);

  const handleAddTask = async (newTask: Task) => {
    await addTask(newTask);
    const updatedData = await getTasks();
    setTasks(updatedData.tasks);
    setActiveTaskId(updatedData.activeTaskId);
  };

  const handleUpdateTask = async (taskId: string, updatedFields: Partial<Task>) => {
    await updateTask(taskId, updatedFields);
    const updatedData = await getTasks();
    setTasks(updatedData.tasks);
    setActiveTaskId(updatedData.activeTaskId);
  };

  const handleSetActiveTask = async (taskId: string | null) => {
    const success = await setActiveTask(taskId);
    if (success) {
      setActiveTaskId(taskId);
    }
  };

  const logActivity = (activityType: string, startTime: Date, duration: number) => {
    const endTime = new Date(startTime.getTime() + duration * 60000);
    console.log(`Logging ${activityType}: ${startTime.toISOString()} - ${endTime.toISOString()}`);
  };

  return (
    <div>
      <PomodoroTimer logActivity={logActivity} />
      <TaskBoard
        tasks={tasks}
        activeTaskId={activeTaskId}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onSetActiveTask={handleSetActiveTask}
      />
    </div>
  );
};

export default FocusPage;
