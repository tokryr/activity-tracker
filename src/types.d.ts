interface Task {
  id?: string;
  userId: string;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  isRecurring: boolean;
  totalTimeSpent: number;
  createdAt: Date;
  updatedAt: Date;
}

interface LogEntry {
  activityType: string;
  startTime: Date;
  endTime: Date;
}
