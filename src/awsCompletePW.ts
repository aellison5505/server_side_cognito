import { AuthClass } from '@aws-amplify/auth';
import express from 'express'
import { AuthInit } from './AuthInit'


export class completePW {
  private req: express.Request;
  private res: express.Response;
  private _Auth: AuthInit;
  private Auth: AuthClass;

  constructor(req: express.Request, res: express.Response) {
    this._Auth = new AuthInit()
    this.Auth = new AuthClass(this._Auth.get_auth)
    this.req = req;
    this.res = res;
    this.signInPw(this.req.body.user, this.req.body.passwd, this.req.body.newpw, this.req.body.attrs);

  }

  private async signInPw(user: string, password: string, newpw: string, attrs: any) {
    try {
      if (user === undefined || password === undefined || newpw === undefined  || attrs === undefined) {
        this.res.status(400).send('missing user or password')
        return;
      }
      let cogUser = await this.Auth.signIn(user, password);
      console.log(cogUser)
      let ret = {}
      if (cogUser['challengeName'] === 'NEW_PASSWORD_REQUIRED') {
      let newCogUser = await this.Auth.completeNewPassword(cogUser, newpw, attrs)
      console.log(newCogUser)
      let session = await this.Auth.currentSession();
      ret = {
        jwtTokn: session.getAccessToken().getJwtToken(),
        idToken: session.getIdToken().getJwtToken(),
        reToken: session.getRefreshToken().getToken(),
        key: process.env.KEY
      }
      } else {
        throw new Error("NO_challengeName")

      }
      this.res.set('Content-Type', 'application/json');
      this.res.status(200).send(ret);
      return
    } catch (e) {
      console.log(e)
      this.res.status(500).send(e
        //{
    //    "message": e.message
    //  }
    );
      return
    }

  }
}
