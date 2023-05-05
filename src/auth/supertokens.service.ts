import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Dashboard from 'supertokens-node/recipe/dashboard';

import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';

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

                  const response = await originalImplementation.signUpPOST(
                    input,
                  );

                  if (response.status === 'OK') {
                    const formFields = input.formFields;
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
