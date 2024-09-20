import { Client, ID, Databases, Storage, Query } from "appwrite";
const appwriteUrl = "https://cloud.appwrite.io/v1";
const appwriteProjectId = "66d205a7001fc9acafeb";
const appwriteDBId = "66d20773001145912a1c";
const appwriteCollectionId = "66d3391800367ac08fae";
const appwriteBucketId = "66ed166c00040b58cd85"; 
export class DBService {
  client = new Client();
  databases;
  storage; // storage or bucket same and use for store image or image ID

  constructor() {
    this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost(title, content, IdOfUser, featureImage) {
    try {
      return await this.databases.createDocument(
        appwriteDBId,
        appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          IdOfUser,
          featureImage
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost error : ", error);
      return null;
    }
  }
  // here need a id to find the post and update so i use slug. and no need to take userID ,its can't update
  async updatePost(slug, { title, content, featureImage }) {
    try {
      return await this.databases.updateDocument(
        appwriteDBId,
        appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost error : ", error);
    }
  }
  async deletePost(postId) {
    try {
      await this.databases.deleteDocument(
        appwriteDBId,
        appwriteCollectionId,
        postId
      );
      return "200"; // for confirmation
    } catch (error) {
      console.log("Appwrite service :: deletePost error : ", error);
      return "401";
    }
  }

  async getPost(IdOfUser) {
    try {
      return await this.databases.getDocument(
        appwriteDBId,
        appwriteCollectionId,
        IdOfUser
      );
    } catch (error) {
      console.log("Appwrite service :: getPost error : ", error);
      return false;
    }
  }
  // queries = [Query.equal("status", "active")]
  async getPosts(queries) {
    try {
      return await this.databases.listDocuments(
        appwriteDBId,
        appwriteCollectionId,
        [Query.equal("IdOfUser", `${queries}`)]
      );
    } catch (error) {
      console.error("Appwrite service :: getPosts error:", error);
      return false;
    }
  }

  // now we start file uploade service
  async uploadFile(file) {
    try {
      return await this.storage.createFile(appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite service :: uploadFile error : ", error);
      return false;
    }
  }

  async deleteFile(fileID) {
    try {
      await this.storage.deleteFile(appwriteBucketId, fileID);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile error : ", error);
      return false;
    }
  }

  //this method is very fast so we don't use async & await
  getFilePreview(fileID) {
    return this.storage.getFilePreview(appwriteBucketId, fileID);
  }
}

const dbService = new DBService();
export default dbService;
