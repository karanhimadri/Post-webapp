import { Client, Account, ID } from "appwrite";
import conf from "../config/envConf";
const appwriteUrl = "https://cloud.appwrite.io/v1";
const appwriteProjectId = "66d205a7001fc9acafeb";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(appwriteUrl)
      .setProject(appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    // needing parameter to signup
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // you can directly redirect the user into login after signup or createAccount
        //now i am directly login the user after sign up
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount error : ", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Appwrite service :: Login Error : ", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser error : ", error);
    }
    // if not get any user session then
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: Logout error : ", error);
    }
  }
}

const authService = new AuthService();
export default authService;
