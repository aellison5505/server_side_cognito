import { MyStorage} from './MyStorage'

export let aws_exports = {
    Auth: {

      region:process.env.region,

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: process.env.userPoolId,

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId:  process.env.userPoolWebClientId,

      storage: new MyStorage()
    }
}
