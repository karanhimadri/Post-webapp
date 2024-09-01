import { Client, Account, ID } from "appwrite";
const appwriteUrl = "https://cloud.appwrite.io/v1";
const appwriteProjectId = "66d205a7001fc9acafeb";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    // needing parameter to signup
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return userAccount;
    } catch (error) {
      console.log("Appwrite service :: createAccount error : ", error);
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      //console.log("Appwrite service :: Login Error : ", error);
      return error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      //console.log("Appwrite service :: getCurrentUser error : ", error);
      console.log(error.code);
    }
    // if not get any user session then
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log("Appwrite service :: Logout error : ", error);
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
