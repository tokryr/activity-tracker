interface TaskItemProps {
  task: Task;
  onUpdateTask: (taskId: string, updatedFields: Partial<Task>) => void;
}

const TaskItem = ({ task, onUpdateTask }: TaskItemProps) => {
  return (
    <li>
      <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      <button onClick={() => onUpdateTask(task.id!, { isActive: !task.isActive })}>
        {task.isActive ? 'Set Inactive' : 'Set Active'}
      </button>
      <button onClick={() => onUpdateTask(task.id!, { isCompleted: true, isActive: false })}>
        Complete
      </button>
    </li>
  );
};

export default TaskItem;
