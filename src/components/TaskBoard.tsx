import { useState } from 'react';
import TaskItem from './TaskItem';

interface TaskBoardProps {
  tasks: Task[];
  activeTaskId: string | null;
  onUpdateTask: (taskId: string, updatedFields: Partial<Task>) => void;
  onAddTask: (newTask: Task) => void;
  onSetActiveTask: (taskId: string | null) => void;
}

const TaskBoard = ({
  tasks,
  activeTaskId,
  onUpdateTask,
  onAddTask,
  onSetActiveTask,
}: TaskBoardProps) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    onAddTask({
      userId: '',
      title: newTaskText,
      description: newTaskDescription,
      isActive: false,
      isCompleted: false,
      isRecurring: false,
      totalTimeSpent: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setNewTaskText('');
    setNewTaskDescription('');
  };

  return (
    <div className="task-board">
      <h1 className="task-board-title">Task List</h1>

      {/* Add task form */}
      <div className="task-form">
        <h2 className="task-form-title">Add New Task</h2>
        <div className="mb-3">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Enter task title"
            className="task-input"
          />
        </div>
        <div className="mb-3">
          <textarea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            className="task-input"
            rows={2}
          />
        </div>
        <button onClick={handleAddTask} className="task-button">
          Add Task
        </button>
      </div>

      {/* Task list */}
      <div className="task-section">
        <h2 className="task-section-title">Your Tasks</h2>
        {tasks.length === 0 ? (
          <p className="task-empty">No tasks yet. Add one above!</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isActive={task.id === activeTaskId}
                onUpdateTask={onUpdateTask}
                onSetActiveTask={onSetActiveTask}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
