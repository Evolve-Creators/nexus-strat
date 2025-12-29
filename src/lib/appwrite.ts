import { Client, Account, Databases, Storage, ID, Query, Permission, Role } from 'appwrite';

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

// --- Helper Functions ---

export async function getProjects(userId: string) {
    try {
        const result = await databases.listDocuments(
            DB_ID,
            COLLECTION_PROJECTS,
            [Query.equal('ownerId', userId), Query.orderDesc('$createdAt')]
        );
        return result.documents;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export async function getProject(projectId: string) {
    try {
        return await databases.getDocument(DB_ID, COLLECTION_PROJECTS, projectId);
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

export async function createProject(userId: string, name: string) {
    try {
        const result = await databases.createDocument(
            DB_ID,
            COLLECTION_PROJECTS,
            ID.unique(),
            {
                name,
                ownerId: userId,
                data: JSON.stringify({ nodes: [], edges: [] }), // Empty initial board
                isPublic: false
            },
            [
                Permission.read(Role.user(userId)),
                Permission.write(Role.user(userId))
            ]
        );
        return result;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

export async function shareProject(projectId: string, userId: string) {
    try {
        await databases.updateDocument(
            DB_ID,
            COLLECTION_PROJECTS,
            projectId,
            { isPublic: true },
            [
                Permission.read(Role.any()),
                Permission.read(Role.user(userId)),
                Permission.write(Role.user(userId))
            ]
        );
        return true;
    } catch (error) {
        console.error('Error sharing project:', error);
        throw error;
    }
}

export async function saveProjectData(projectId: string, data: any) {
    try {
        await databases.updateDocument(
            DB_ID,
            COLLECTION_PROJECTS,
            projectId,
            {
                data: JSON.stringify(data)
            }
        );
    } catch (error) {
        console.error('Error saving project:', error);
        throw error;
    }
}

export async function deleteProject(projectId: string) {
    try {
        await databases.deleteDocument(DB_ID, COLLECTION_PROJECTS, projectId);
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}
