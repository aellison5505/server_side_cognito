
import 'isomorphic-fetch';
//import Auth from '@aws-amplify/auth';
import { MyStorage } from "./MyStorage";
import { aws_exports } from './auth-exports'


export class AuthInit {

private _aws_exports: aws_exports;


  constructor () {
    this._aws_exports = this.init()
  }

private init (): aws_exports{
  return {
           
      //region : <string>process.env.region,
      region : `${process.env.region}`,
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId:  `${process.env.userPoolId}`,

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: `${process.env.userPoolWebClientId}`,

      storage: new MyStorage()
    
  }

  //return my_exports;
}

 get get_auth(){
  // console.log(this.aws_exports)
   return this._aws_exports;
 }

 get storage(){
   return this._aws_exports.storage;

 }
}
