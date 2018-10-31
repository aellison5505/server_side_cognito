import { MyStorage} from './MyStorage'

export interface aws_exports  {
    

      region: string,

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: string,

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId:  string,

      storage: MyStorage
    }

