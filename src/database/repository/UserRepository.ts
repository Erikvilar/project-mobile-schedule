import { DatabaseClient } from '@/database/DatabaseClient';
import { Q } from '@nozbe/watermelondb';

const TABLE_USERS = 'users';
const TABLE_PROFILE = 'profile';

export class UserRepository {
  private usersDb = new DatabaseClient(TABLE_USERS);
  private profileDb = new DatabaseClient(TABLE_PROFILE);

  async create(user: any): Promise<void> {
    await this.usersDb.create(user);
  }

  async getExistentUsers(value: string, field: string): Promise<boolean> {
    return await this.usersDb.existsByQuery(
      Q.where(field, Q.like(`%${value}%`)),
    );
  }

  async getAll(): Promise<any[]> {
    return await this.usersDb.getAll();
  }

  async findByEmailOrId(
    value: string,
    type: 'email' | 'id',
  ): Promise<any | null> {
    if (type === 'id') {
      return await this.usersDb.get(value);
    }
    const records = await this.usersDb.getAll();
    const user = records.find((u: any) => u.email === value);
    return user || null;
  }

  async findById(id: string): Promise<any | null> {
    return await this.usersDb.get(id);
  }

  async updateUser(userId: string, data: any): Promise<void> {
    await this.usersDb.update(userId, data);
  }

  async deleteUser(userId: string): Promise<void> {
    const profile = await this.findProfileByUserId(userId);
    if (profile) {
      await this.deleteProfile(userId);
    }
    await this.usersDb.delete(userId);
  }

  async createProfile(profileData: any): Promise<void> {
    const dataToCreate = {
      user_id: profileData.userId,
      bio: profileData.bio || '',
      image: profileData.image || '',
      avatar_url: profileData.avatar_url || '',
      website: profileData.website || '',
      location: profileData.location || '',
      phone: profileData.phone || '',
      theme: profileData.theme || 'dark-tech',
    };
    await this.profileDb.create(dataToCreate);
  }

  async findProfileByUserId(userId: string): Promise<any | null> {
    const records = await this.profileDb.getAll();
    const profile = records.find((p: any) => p.user_id === userId);
    return profile || null;
  }

  async updateProfile(userId: string, profileData: any): Promise<void> {
    const profile = await this.findProfileByUserId(userId);
    if (!profile) {
      await this.createProfile({ userId, ...profileData });
      return;
    }
    await this.profileDb.update(profile.id, profileData);
  }

  async deleteProfile(userId: string): Promise<void> {
    const profile = await this.findProfileByUserId(userId);
    if (profile) {
      await this.profileDb.delete(profile.id);
    }
  }
}
