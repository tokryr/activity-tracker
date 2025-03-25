import { Request, Response } from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = getFirestore();

// Set the region to europe-north1, does not seem to working while deploying when only in firebase.json
const region = 'europe-north1';

exports.getTasks = onRequest({ region, cors: true }, async (_req: Request, res: Response) => {
  try {
    const tasksSnapshot = await db.collection('tasks').get();
    const tasks = tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Failed to fetch tasks');
  }
});

exports.addTask = onRequest({ region }, async (req: Request, res: Response) => {
  try {
    const taskData = req.body;
    const newTaskRef = await db.collection('tasks').add(taskData);
    res.status(201).json({ id: newTaskRef.id, ...taskData });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).send('Failed to add task');
  }
});

exports.updateTask = onRequest({ region }, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const taskData = req.body;

    const taskRef = db.collection('tasks').doc(id);
    await taskRef.update(taskData);

    res.status(200).send(`Task with ID ${id} updated successfully`);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Failed to update task');
  }
});

exports.deleteTask = onRequest({ region }, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const taskRef = db.collection('tasks').doc(id);
    await taskRef.delete();

    res.status(200).send(`Task with ID ${id} deleted successfully`);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Failed to delete task');
  }
});
