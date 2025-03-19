import { auth, appCheck } from '@/services/firebase';
import { getToken as getAppCheckToken } from 'firebase/app-check';

const API_BASE_URL = 'https://<your-project-id>.cloudfunctions.net';

const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const idToken = await user.getIdToken();
  const appCheckToken = await getAppCheckToken(appCheck);

  return {
    Authorization: `Bearer ${idToken}`,
    'X-Firebase-AppCheck': appCheckToken?.token || '',
    'Content-Type': 'application/json',
  };
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/getTasks`, {
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

export const addTask = async (newTask: Task) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/addTask`, {
      method: 'POST',
      headers,
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      console.error('Failed to add task:', response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const updateTask = async (taskId: string, updatedFields: Partial<Task>) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/updateTask`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ id: taskId, ...updatedFields }),
    });

    if (!response.ok) {
      console.error('Failed to update task:', response.statusText);
      return;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/deleteTask?taskId=${taskId}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      console.error('Failed to delete task:', response.statusText);
      return;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
