import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  // Create user in BDD with username and password
  async create(userData: { username: string; password: string }): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  // Looking for user in BDD
  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  //TODO to secure
  async validateUser(username: string, password: string): Promise<boolean> {
    // Retrieve user
    const user = await this.findByUsername(username);
    if (!user) {
      return false; // user don't exist
    }
    // Check if passwords match (no secure)
    return user.password === password;
  }

}
