'use server';

import { db } from '@/db';
import { theme as themeTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { UnauthorizedError } from '@/types/errors';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

// Helper to get user ID with better error handling
async function getCurrentUserId(): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }

  return session.user.id;
}

// Log errors for observability
function logError(error: Error, context: Record<string, any>) {
  console.error('Theme action error', error, context);

  // TODO: Add server-side error reporting to PostHog or your preferred service
  // For production, you'd want to send critical errors to an external service
  if (error.name === 'UnauthorizedError' || error.name === 'ValidationError') {
    // These are expected errors, log but don't report
    console.warn('Expected error:', { error: error.message, context });
  } else {
    // For unexpected errors, report to external service
    console.error('Unexpected error:', { error: error.message, stack: error.stack, context });
  }
}

// Layer 1: Clean server actions with proper error handling
export async function getThemes() {
  try {
    const userId = await getCurrentUserId();
    const userThemes = await db.select().from(themeTable).where(eq(themeTable.userId, userId));
    return userThemes;
  } catch (error) {
    logError(error as Error, { action: 'getThemes' });
    throw error;
  }
}
