import { ThemeStyles } from '@/types/theme';
import { boolean, integer, json, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const theme = pgTable('theme', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  styles: json('styles').$type<ThemeStyles>().notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const aiUsage = pgTable('ai_usage', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
  modelId: text('model_id').notNull(),
  promptTokens: text('prompt_tokens').notNull().default('0'),
  completionTokens: text('completion_tokens').notNull().default('0'),
  daysSinceEpoch: text('days_since_epoch').notNull(),
  createdAt: timestamp('created_at').notNull(),
});

export const subscription = pgTable('subscription', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at').notNull(),
  modifiedAt: timestamp('modified_at').notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull(),
  recurringInterval: text('recurring_interval').notNull(),
  status: text('status').notNull(),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  canceledAt: timestamp('canceled_at'),
  startedAt: timestamp('started_at').notNull(),
  endsAt: timestamp('ends_at'),
  endedAt: timestamp('ended_at'),
  customerId: text('customer_id').notNull(),
  productId: text('product_id').notNull(),
  discountId: text('discount_id'),
  checkoutId: text('checkout_id').notNull(),
  customerCancellationReason: text('customer_cancellation_reason'),
  customerCancellationComment: text('customer_cancellation_comment'),
  metadata: json('metadata').$type<Record<string, string>>(),
  customFieldData: json('custom_field_data').$type<Record<string, string>>(),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
});
