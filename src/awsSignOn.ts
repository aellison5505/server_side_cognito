import {AuthClass} from '@aws-amplify/auth';
import express from 'express'
import { AuthInit } from './AuthInit'


export class signOn {
  private req: express.Request;
  private res: express.Response;
  private _Auth: AuthInit;
  private Auth: AuthClass;
  private aws_conf: any;

  constructor(req: express.Request, res: express.Response){
    this._Auth = new AuthInit()
    this.aws_conf = this._Auth.get_auth
    this.Auth = new AuthClass(this._Auth.get_auth)
    this.req = req;
    this.res = res;
    this.signIn(this.req.body.user, this.req.body.passwd);

  }

  private async signIn(user: string, password: string){
    try {
      if(user === undefined || password === undefined){
        this.res.status(400).send('missing user or password')
        return;
      }
      let cogUser = await this.Auth.signIn(user, password);
      console.log('good')
      this.res.set('Content-Type', 'application/json');
      let session = await this.Auth.currentSession();
      let jwt = {
          jwtTokn:session.getAccessToken().getJwtToken(),
          idToken:session.getIdToken().getJwtToken(),
          reToken:session.getRefreshToken().getToken(),
          key: process.env.KEY
      }
      this.res.status(200).send(jwt);
      return
    }catch (e){
      console.log(e)
      this.res.status(500).send({
        "message":e.message
      });
      return
    }

  }
}
