import { onRequest } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions/v2';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getAppCheck } from 'firebase-admin/app-check';
import { Request } from 'express';
import corsLib from 'cors';
import { z } from 'zod';

initializeApp({ credential: applicationDefault() });
const db = getFirestore();
const auth = getAuth();
const appCheck = getAppCheck();
const cors = corsLib({ origin: true });

const TaskSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  isActive: z.boolean(),
  isCompleted: z.boolean(),
  totalTimeSpent: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const TaskUpdateSchema = TaskSchema.partial().extend({
  id: z.string(),
});

async function verifyRequest(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }
  const token = authHeader.split('Bearer ')[1];
  const decodedToken = await auth.verifyIdToken(token);

  const appCheckToken = req.headers['x-firebase-appcheck'] as string;
  if (!appCheckToken) {
    throw new Error('Missing App Check token');
  }
  await appCheck.verifyToken(appCheckToken);
  return decodedToken.uid;
}

export const getTasks = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).send('Method Not Allowed');
    }

    try {
      const userId = await verifyRequest(req);
      const snapshot = await db.collection('tasks').where('userId', '==', userId).get();
      const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      logger.info(`Fetched ${tasks.length} tasks for user ${userId}`);
      return res.status(200).json(tasks);
    } catch (error: any) {
      logger.error('Error in getTasks:', error);
      return res.status(401).json({ error: error.message });
    }
  });
});

export const addTask = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    try {
      const userId = await verifyRequest(req);
      const taskValidation = TaskSchema.safeParse(req.body);
      if (!taskValidation.success) {
        return res
          .status(400)
          .json({ error: 'Invalid task data', details: taskValidation.error.flatten() });
      }

      const newTask = taskValidation.data;
      if (newTask.userId !== userId) {
        return res.status(403).json({ error: 'User ID mismatch' });
      }

      const docRef = await db.collection('tasks').add(newTask);
      logger.info(`Task added with ID: ${docRef.id}`);
      return res.status(201).json({ id: docRef.id });
    } catch (error: any) {
      logger.error('Error in addTask:', error);
      return res.status(401).json({ error: error.message });
    }
  });
});

export const updateTask = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'PATCH') {
      return res.status(405).send('Method Not Allowed');
    }

    try {
      const userId = await verifyRequest(req);
      const updateValidation = TaskUpdateSchema.safeParse(req.body);
      if (!updateValidation.success) {
        return res
          .status(400)
          .json({ error: 'Invalid update payload', details: updateValidation.error.flatten() });
      }

      const { id, ...updates } = updateValidation.data;
      // Optionally: Check that the task belongs to the authenticated user
      const taskRef = db.collection('tasks').doc(id);
      const taskDoc = await taskRef.get();

      if (!taskDoc.exists) {
        return res.status(404).json({ error: 'Task not found' });
      }

      const taskData = taskDoc.data();
      if (taskData?.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized to update this task' });
      }

      await taskRef.update({
        ...updates,
        updatedAt: new Date().toISOString(),
      });

      logger.info(`Task ${id} updated for user ${userId}`);
      return res.status(200).json({ success: true, updatedTaskId: id });
    } catch (error: any) {
      logger.error('Error in updateTask:', error);
      return res.status(401).json({ error: error.message });
    }
  });
});

export const deleteTask = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'DELETE') {
      return res.status(405).send('Method Not Allowed');
    }

    try {
      const userId = await verifyRequest(req);
      const taskId = req.query.taskId as string;

      if (!taskId) {
        return res.status(400).json({ error: 'Missing taskId in query parameters' });
      }

      const taskRef = db.collection('tasks').doc(taskId);
      const taskDoc = await taskRef.get();

      if (!taskDoc.exists) {
        return res.status(404).json({ error: 'Task not found' });
      }

      if (taskDoc.data()?.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized to delete this task' });
      }

      await taskRef.delete();
      logger.info(`Task ${taskId} deleted for user ${userId}`);
      return res.status(200).json({ success: true, deletedTaskId: taskId });
    } catch (error: any) {
      logger.error('Error in deleteTask:', error);
      return res.status(401).json({ error: error.message });
    }
  });
});
