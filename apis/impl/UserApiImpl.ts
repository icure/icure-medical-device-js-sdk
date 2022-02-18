import {User} from "../../models/User";
import {Filter} from "../../models/Filter";
import {PaginatedListUser} from "../../models/PaginatedListUser";
import {UserApi} from "../UserApi";

class UserApiImpl implements UserApi {
  checkTokenValidity(userId: string, token: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  createOrModifyUser(user: User): Promise<User> {
    return Promise.resolve(undefined);
  }

    createToken(userId: string): Promise<string> {
        return Promise.resolve("");
    }

    deleteUser(userId: string): Promise<string> {
        return Promise.resolve("");
    }

    filterUsers(filter: Filter, nextUserId?: string, limit?: number): Promise<PaginatedListUser> {
        return Promise.resolve(undefined);
    }

    getLoggedUser(): Promise<User> {
        return Promise.resolve(undefined);
    }

    getUser(userId: string): Promise<User> {
        return Promise.resolve(undefined);
    }

    matchUsers(filter: Filter): Promise<Array<string>> {
        return Promise.resolve(undefined);
    }
}
