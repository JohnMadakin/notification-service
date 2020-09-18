import User, { UserModel } from '../database/model/User';
import Role, { RoleModel } from '../database/model/Role';
import { InternalError } from '../helpers/ApiError';
import { Types } from 'mongoose';

export default class UserRepo {
  public static findById(id: Types.ObjectId): Promise<User> {
    return UserModel.findOne({ _id: id, status: true })
      .select('+email +password +roles')
      .populate({
        path: 'roles',
        match: { status: true },
      })
      .lean<User>()
      .exec();
  }

  public static findByEmail(email: string): Promise<User> {
    return UserModel.findOne({ email: email, status: true })
      .select('+email +password +roles')
      .populate({
        path: 'roles',
        match: { status: true },
        select: { code: 1 },
      })
      .lean<User>()
      .exec();
  }

  public static async create(user: User, roleCode: string): Promise<{ user: User }> {
    const now = new Date();

    const role = await RoleModel.findOne({ code: roleCode })
      .select('+email +password')
      .lean<Role>()
      .exec();
    if (!role) throw new InternalError('Role must be defined');

    user.roles = [role._id];
    user.createdAt = user.updatedAt = now;
    const createdUser = await UserModel.create(user);
    return { user: createdUser.toObject() };
  }

  public static updateInfo(user: User): Promise<any> {
    user.updatedAt = new Date();
    return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
  }
}
