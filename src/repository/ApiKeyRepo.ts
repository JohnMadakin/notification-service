import ApiKey, { ApiKeyModel } from '../database/model/ApiKey';

export default class ApiRepo {
  public static async findByKey(key: string): Promise<ApiKey> {
    return ApiKeyModel.findOne({ key: key, status: true }).lean<ApiKey>().exec();
  }
}
