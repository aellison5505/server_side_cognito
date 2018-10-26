import { AuthClass } from '@aws-amplify/auth';
import express from 'express'
//import {CognitoUser} from 'amazon-cognito-identity-js';
import { AuthInit } from './AuthInit';
(<any>global).navigator = {};



export class confirmSU {
  private req: express.Request;
  private res: express.Response;
  private _Auth: AuthInit;
  private Auth: AuthClass;



  constructor(req: express.Request, res: express.Response) {

    this._Auth = new AuthInit()
    this.Auth = new AuthClass(this._Auth.get_auth)
    this.req = req;
    this.res = res;
    this.confirmCode(this.req.body.user, this.req.body.code);

  }

  private async confirmCode(user: string, code: string){
    try {
      if (user === undefined || code === undefined) {
        this.res.status(400).send('missing information')
        return;
      }
      let done = await this.Auth.confirmSignUp(user,code);
      console.log(done)

      let ret = {};

      this.res.set('Content-Type', 'application/json');
      this.res.status(200).send(ret);
      return
    } catch (e) {

      this.res.status(500).send(e
        //{
    //    "message": e.message
    //  }
    );
      return
    }

  }
}
