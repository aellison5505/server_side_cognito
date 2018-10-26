import { AuthClass } from '@aws-amplify/auth';
import express from 'express'
//import {CognitoUser} from 'amazon-cognito-identity-js';
import { AuthInit } from './AuthInit';
(<any>global).navigator = {};



export class signUp {
  private req: express.Request;
  private res: express.Response;
  private _Auth: AuthInit;
  private Auth: AuthClass;



  constructor(req: express.Request, res: express.Response) {

    this._Auth = new AuthInit()
    this.Auth = new AuthClass(this._Auth.get_auth)
    this.req = req;
    this.res = res;
    this.reg(this.req.body.user, this.req.body.passwd, this.req.body.attributes);

  }

  private async reg(user: string, password: string, attributes: object){
    try {
      if (user === undefined || password === undefined || attributes === undefined) {
        this.res.status(400).send('missing information')
        return;
      }
      let done = await this.Auth.signUp({ username:user, password: password, attributes: attributes});
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
