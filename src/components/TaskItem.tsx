interface TaskItemProps {
  task: Task;
  isActive: boolean;
  onUpdateTask: (taskId: string, updatedFields: Partial<Task>) => void;
  onSetActiveTask: (taskId: string | null) => void;
}

const TaskItem = ({ task, isActive, onUpdateTask, onSetActiveTask }: TaskItemProps) => {
  const itemClasses = `task-item ${isActive ? 'task-item-active' : ''} ${
    task.isCompleted ? 'task-item-completed' : ''
  }`;

  const handleToggleActive = () => {
    if (isActive) {
      onSetActiveTask(null); // Deactivate if already active
    } else {
      onSetActiveTask(task.id!); // Activate this task
    }
  };

  const handleComplete = () => {
    onUpdateTask(task.id!, {
      isCompleted: true,
    });
    if (isActive) {
      onSetActiveTask(null);
    }
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
          className={isActive ? 'task-btn task-btn-active' : 'task-btn task-btn-inactive'}
          disabled={task.isCompleted}
          title={isActive ? 'Mark as inactive' : 'Mark as active'}
        >
          {isActive ? 'Active' : 'Inactive'}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
