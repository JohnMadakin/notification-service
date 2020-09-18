jest.resetAllMocks(); // make sure we do not have any mocks set from unit tests

import supertest from 'supertest';
import app from '../../../../src/app';
import User, { UserModel } from '../../../../src/database/model/User';
import bcrypt from 'bcrypt';

export const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare');

describe('Login route', () => {
  const endpoint = '/v1/login';
  const request = supertest(app);
  const password = '123456';

  let user: User;

  beforeAll(async () => {
    await UserModel.remove({});
    user = await UserModel.create({
      name: 'abc',
      email: 'abc@xyz.com',
      password: bcrypt.hashSync(password, 10),
      updatedAt: new Date(),
      createdAt: new Date(),
    } as User);
  });

  afterAll(async () => {
    await UserModel.remove({}); // delete all data from user table
  });

  beforeEach(() => {
    bcryptCompareSpy.mockClear();
  });

  it('Should send error when empty body is sent', async () => {
    const response = await addHeaders(request.post(endpoint), 'acfadsgfdhgf');
    expect(response.status).toBe(400);
    expect(bcryptCompareSpy).not.toBeCalled();
  });

  it('Should send success response for correct credentials', async () => {
    const response = await request.post(endpoint).send({
      email: user.email,
      password: password,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/Success/i);
    expect(response.body.data).toBeDefined();

    expect(response.body.data.user).toHaveProperty('_id');
    expect(response.body.data.user).toHaveProperty('name');
    expect(response.body.data).toHaveProperty('token');

    expect(bcryptCompareSpy).toBeCalledWith(password, user.password);
  });
});

export const addHeaders = (request: any, token: string) =>
  request.set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`);
