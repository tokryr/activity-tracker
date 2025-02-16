import { useState } from 'react';

interface TaskListProps {
    tasks: Task[];
    onUpdateTasks: (tasks: Task[]) => void;
}

const TaskList = ({
    tasks,
    onUpdateTasks
}: TaskListProps) => {
    const [newTaskText, setNewTaskText] = useState('');

    const handleAddTask = () => {
        if (newTaskText.trim() === '') return;
        const newTask: Task = {
            id: Date.now(),
            text: newTaskText,
            isActive: false,
            isCompleted: false,
            totalTime: 0,
        };
        onUpdateTasks([...tasks, newTask]);
        setNewTaskText('');
    };

    const handleSetActive = (id: number) => {
        const updatedTasks = tasks.map(task => ({
            ...task,
            isActive: task.id === id ? !task.isActive : false,  // Only allow one active task at a time
            isCompleted: task.isCompleted
        }));
        onUpdateTasks(updatedTasks);
    };

    const handleCompleteTask = (id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, isCompleted: true, isActive: false } : task
        );
        onUpdateTasks(updatedTasks);
    };

    const handleDeleteTask = (id: number) => {
        onUpdateTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div>
            <h1>Task List</h1>
            <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', fontWeight: task.isActive ? 'bold' : 'normal' }}>
                            {task.text}
                        </span>
                        <button onClick={() => handleSetActive(task.id)}>
                            {task.isActive ? 'Set Inactive' : 'Set Active'}
                        </button>
                        <button onClick={() => handleCompleteTask(task.id)} disabled={task.isCompleted}>
                            Complete
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
