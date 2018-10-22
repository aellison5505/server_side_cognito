import { AuthClass } from '@aws-amplify/auth';
import express from 'express'
import { AuthInit } from './AuthInit'


export class forgotPw {
  private req: express.Request;
  private res: express.Response;
  private _Auth: AuthInit;
  private Auth: AuthClass;

  constructor(req: express.Request, res: express.Response) {
    this._Auth = new AuthInit()
    this.Auth = new AuthClass(this._Auth.get_auth)
    this.req = req;
    this.res = res;
    this.fgPw(this.req.body.user);

  }

  private async fgPw(user: string) {
    try {
      if (user === undefined ) {
        this.res.status(400).send('missing user, code or password')
        return;
      }
      let sent = await this.Auth.forgotPassword(user);
      console.log(sent)
      let ret = { ret: sent }
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
