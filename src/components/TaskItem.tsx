interface TaskItemProps {
  task: Task;
  onUpdateTask: (taskId: string, updatedFields: Partial<Task>) => void;
}

const TaskItem = ({ task, onUpdateTask }: TaskItemProps) => {
  const itemClasses = `task-item ${task.isActive ? 'task-item-active' : ''} ${
    task.isCompleted ? 'task-item-completed' : ''
  }`;

  console.log('task', task);

  const handleToggleActive = () => {
    onUpdateTask(task.id!, {
      isActive: !task.isActive,
      // If making active and was completed, uncomplete it
      isCompleted: task.isActive ? task.isCompleted : false,
    });
  };

  const handleComplete = () => {
    onUpdateTask(task.id!, {
      isCompleted: true,
      isActive: false,
    });
  };

  const handleUncomplete = () => {
    onUpdateTask(task.id!, {
      isCompleted: false,
    });
  };

  return (
    <li className={itemClasses}>
      {/* Status button */}
      <div className="task-actions">
        {task.isCompleted ? (
          <button
            onClick={handleUncomplete}
            className="task-btn task-btn-completed"
            title="Mark as not completed"
          >
            Completed
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="task-btn task-btn-complete"
            title="Mark as completed"
          >
            Complete
          </button>
        )}
      </div>

      {/* Task content */}
      <div className="task-content">
        <p className={task.isCompleted ? 'task-title-completed' : 'task-title'}>{task.title}</p>
        {task.description && <p className="task-description">{task.description}</p>}
      </div>

      {/* Active toggle button */}
      <div className="task-actions">
        <button
          onClick={handleToggleActive}
          className={task.isActive ? 'task-btn task-btn-active' : 'task-btn task-btn-inactive'}
          disabled={task.isCompleted}
          title={task.isActive ? 'Mark as inactive' : 'Mark as active'}
        >
          {task.isActive ? 'Active' : 'Inactive'}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
