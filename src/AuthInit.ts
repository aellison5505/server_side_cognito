
import 'isomorphic-fetch';
import Auth from '@aws-amplify/auth';
import { MyStorage } from "./MyStorage";
import { aws_exports } from './auth-exports'


export class AuthInit {

private aws_exports: any
private store: MyStorage
//private aws_auth: any

  constructor () {
    this.aws_exports = aws_exports;
    this.store = new MyStorage();
    this.aws_exports['storage'] = this.store;
    Auth.configure(this.aws_exports);
  }

 get get_auth(){
   return this.aws_exports;
 }
}
