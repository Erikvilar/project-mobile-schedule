import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export class Note extends Model {
  static table = 'notes';

  @field('title')
  title!: string;

  @field('content')
  content!: string;

  @field('color')
  color?: string;

  @field('category')
  category?: string;

  @field('is_pinned')
  isPinned!: boolean;

  @field('is_archived')
  isArchived!: boolean;

  @field('is_favorite')
  isFavorite!: boolean;

  @field('is_deleted')
  isDeleted!: boolean;

  @date('created_at')
  createdAt!: Date;

  @date('updated_at')
  updatedAt!: Date;

  @date('synced_at')
  syncedAt?: Date;

  get isRecent(): boolean {
    const oneDayAgo = Date.now() - 86400000;
    return this.createdAt.getTime() > oneDayAgo;
  }
}
