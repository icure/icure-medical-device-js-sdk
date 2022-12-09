import 'mocha';

import {assert} from "chai";
import {UserMapper} from "../../src/mappers/user";
import {newUser} from "../models/userTest";

describe('User mapper test', () => {
  it('Mapping/Unmapping of User model - Success', () => {
    const user = newUser()
    const mappedUser = UserMapper.toUserDto(user)
    assert.deepEqual(UserMapper.toUser(mappedUser), user)
  });
});

