import { AuthClass } from '@aws-amplify/auth';
import express from 'express'
import { AuthInit } from './AuthInit'


export class subForgotPw {
  private req: express.Request;
  private res: express.Response;
  private _Auth: AuthInit;
  private Auth: AuthClass;

  constructor(req: express.Request, res: express.Response) {
    this._Auth = new AuthInit()
    this.Auth = new AuthClass(this._Auth.get_auth)
    this.req = req;
    this.res = res;
    this.subPw(this.req.body.user, this.req.body.code, this.req.body.passwd);

  }

  private async subPw(user: string, code: string, password: string) {
    try {
      if (user === undefined || code === undefined || password === undefined) {
        this.res.status(400).send('missing user, code or password')
        return;
      }
      let seccess = await this.Auth.forgotPasswordSubmit(user, code, password);
      console.log(seccess)
      let ret = {}
      this.res.set('Content-Type', 'application/json');
      this.res.status(200).send(ret);
      return
    } catch (e) {
      console.log(e)
      this.res.status(500).send(e);
      return
    }

  }
}
