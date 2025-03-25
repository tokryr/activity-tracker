import { auth } from '@/services/firebase';

const API_BASE_URL = import.meta.env.VITE_FIREBASE_API_BASE_URL;

const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const idToken = await user.getIdToken();
  return {
    Authorization: `Bearer ${idToken}`,
    'Content-Type': 'application/json',
  };
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      console.error('Failed to fetch tasks:', response.statusText);
      return [];
    }

    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const addTask = async (taskData: Task): Promise<Task | null> => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers,
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      console.error('Failed to add task:', response.statusText);
      return null;
    }

    const newTask = await response.json();
    return newTask;
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
};

export const updateTask = async (
  taskId: string,
  updatedFields: Partial<Task>
): Promise<Task | null> => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      console.error('Failed to update task:', response.statusText);
      return null;
    }

    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
};

export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    const headers = await getAuthHeaders();

    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      console.error('Failed to delete task:', response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};
