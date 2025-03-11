import { useState } from 'react';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updatedFields: Partial<Task>) => void;
  onAddTask: (newTask: Task) => void;
}

const TaskList = ({ tasks, onUpdateTask, onAddTask }: TaskListProps) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    onAddTask({
      userId: '',
      title: newTaskText,
      description: '',
      isActive: false,
      isCompleted: false,
      isRecurring: false,
      totalTimeSpent: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setNewTaskText('');
  };

  return (
    <div>
      <h1>Task List</h1>
      <input type="text" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onUpdateTask={onUpdateTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
