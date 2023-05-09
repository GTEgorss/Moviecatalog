import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Dashboard from 'supertokens-node/recipe/dashboard';

import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';
import { UserValidator } from '../User/user.validator';
import { UserDto } from '../User/dto/user.dto';
import { UserService } from '../User/user.service';
import prisma from '../main';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'username',
              },
              {
                id: 'fullname',
              },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function (input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw Error('Should never come here');
                  }

                  const validator = new UserValidator();
                  const userDto = new UserDto(
                    input.formFields.at(2).value,
                    input.formFields.at(1).value,
                    input.formFields.at(3).value,
                    input.formFields.at(0).value,
                  );

                  try {
                    await validator.validate(userDto);
                  } catch (e) {
                    return { status: 'GENERAL_ERROR', message: e.message };
                  }

                  const response = await originalImplementation.signUpPOST(
                    input,
                  );

                  if (response.status === 'OK') {
                    const { id, email } = response.user;

                    const createdUser = await new UserService().createUser(
                      userDto,
                    );

                    await prisma.userIdToExternalId.create({
                      data: {
                        userId: createdUser.id,
                        externalId: id,
                      },
                    });
                  }
                  return response;
                },
              };
            },
          },
        }),
        Session.init(),
        Dashboard.init(),
      ],
    });
  }
}
