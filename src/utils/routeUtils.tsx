import { redirect } from '@tanstack/react-router';
import { auth } from '@/services/firebase';

export const protectRoute = async () => {
  return new Promise<void>((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        unsubscribe();

        if (!user) {
          reject(redirect({ to: '/login' }));
        } else {
          resolve();
        }
      },
      (error) => {
        console.error('Auth error:', error);
        reject(redirect({ to: '/login' }));
      }
    );
  });
};
