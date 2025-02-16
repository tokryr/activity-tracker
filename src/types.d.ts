interface Task {
    id: number;
    text: string;
    isActive: boolean;
    isCompleted: boolean;
    totalTime: number;
}

interface LogEntry {
    activityType: string;
    startTime: Date;
    endTime: Date;
}

