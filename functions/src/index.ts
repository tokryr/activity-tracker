import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = getFirestore();
const region = 'europe-north1';

const app = express();

app.use(express.json());

interface AuthenticatedRequest extends express.Request {
  user?: admin.auth.DecodedIdToken;
}

const authenticateUser = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - Missing or invalid token format' });
    }

    const idToken = authHeader.split('Bearer ')[1];

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Add user to request object
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
  return;
};

// Apply authentication to all routes
app.use(authenticateUser);

// Task routes
app.get('/tasks', async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    // Only fetch tasks for the authenticated user
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ error: 'User ID not found' });
    }

    const tasksSnapshot = await db.collection('tasks').where('userId', '==', userId).get();

    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
  return;
});

app.post('/tasks', async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ error: 'User ID not found' });
    }

    const taskData = {
      ...req.body,
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const taskRef = await db.collection('tasks').add(taskData);

    res.status(201).json({
      id: taskRef.id,
      ...taskData,
    });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Failed to add task' });
  }
  return;
});

app.patch('/tasks/:id', async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    const userId = req.user?.uid;
    const taskId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: 'User ID not found' });
    }

    // Get the task to verify ownership
    const taskDoc = await db.collection('tasks').doc(taskId).get();

    if (!taskDoc.exists) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const taskData = taskDoc.data();

    if (taskData?.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this task' });
    }

    // Update the task with current timestamp
    const updateData = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('tasks').doc(taskId).update(updateData);

    // Return updated task data
    res.status(200).json({
      id: taskId,
      ...taskData,
      ...updateData,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
  return;
});

app.delete('/tasks/:id', async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    const userId = req.user?.uid;
    const taskId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: 'User ID not found' });
    }

    // Get the task to verify ownership
    const taskDoc = await db.collection('tasks').doc(taskId).get();

    if (!taskDoc.exists) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const taskData = taskDoc.data();

    if (taskData?.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this task' });
    }

    await db.collection('tasks').doc(taskId).delete();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
  return;
});

exports.api = onRequest(
  {
    region,
    cors: true,
  },
  app
);
