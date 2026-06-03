
import { appSchema } from '@nozbe/watermelondb';
import { userSchema } from './userSchema';
import { appConfigSchema } from '@/database/schemas/appConfigSchema.ts';
import { profileSchema } from '@/database/schemas/profileSchema.ts';
import { memorySchema } from '@/database/schemas/memorySchema.ts';
import { conversationSchema } from '@/database/schemas/conversationSchema.ts';


export const TABLE_USERS = 'users'
export const TABLE_PROFILE = 'profile'
export const TABLE_CONVERSATION = 'conversation';
export const TABLE_MEMORY = 'memory';
export const mySchema = appSchema({
  version: 1,
  tables: [userSchema,profileSchema,memorySchema,conversationSchema, appConfigSchema],
});
