import { db } from './firebase';
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  writeBatch,
  query,
  where,
} from 'firebase/firestore';

const tasksCollectionRef = collection(db, 'tasks');

export const getTasks = async (): Promise<Task[]> => {
  try {
    const data = await getDocs(tasksCollectionRef);
    return data.docs.map((doc) => ({ ...(doc.data() as Task), id: doc.id }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addTask = async (newTask: Task) => {
  try {
    await addDoc(tasksCollectionRef, newTask);
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (taskId: string, updatedFields: Partial<Task>) => {
  if (!taskId) return;
  const taskDoc = doc(db, 'tasks', taskId);

  try {
    await updateDoc(taskDoc, {
      ...updatedFields,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error(error);
  }
};

// TODO: store each users active task in a separate collection and not in the tasks collection
// This will allow for better performance when querying for active tasks

export const updateActiveTask = async (newActiveTaskId: string) => {
  const batch = writeBatch(db);

  const activeTaskQuery = query(collection(db, 'tasks'), where('isActive', '==', true));
  const activeTaskSnapshot = await getDocs(activeTaskQuery);

  activeTaskSnapshot.forEach((doc) => {
    batch.update(doc.ref, { isActive: false });
  });

  const newActiveTaskRef = doc(db, 'tasks', newActiveTaskId);
  batch.update(newActiveTaskRef, { isActive: true });

  try {
    await batch.commit();
    console.log('Updated active task successfully');
  } catch (error) {
    console.error('Failed to update active task: ', error);
  }
};
