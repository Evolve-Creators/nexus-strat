import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69521e8c00361b9f0213'); // Project ID from user

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database Constants
export const DB_ID = 'analysis-db';
export const COLLECTION_PROJECTS = 'projects';

export const appwriteConfig = {
    projectId: '69521e8c00361b9f0213',
    databaseId: DB_ID,
    projectCollectionId: COLLECTION_PROJECTS,
};
