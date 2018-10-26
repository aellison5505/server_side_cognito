import { AuthClass } from '@aws-amplify/auth';
import express from 'express'
//import {CognitoUser} from 'amazon-cognito-identity-js';
import { AuthInit } from './AuthInit';
(<any>global).navigator = {};



export class signOn {
  private req: express.Request;
  private res: express.Response;
  private _Auth: AuthInit;
  private Auth: AuthClass;



  constructor(req: express.Request, res: express.Response) {

    this._Auth = new AuthInit()
    this.Auth = new AuthClass(this._Auth.get_auth)
    this.req = req;
    this.res = res;
    this.signIn(this.req.body.user, this.req.body.passwd);

  }

  private async signIn(user: string, password: string) {
    try {
      if (user === undefined || password === undefined) {
        this.res.status(400).send('missing user or password')
        return;
      }
      let cogUser = await this.Auth.signIn(user, password);
      console.log(cogUser)
    
      let ret = {}
      if (cogUser['challengeName'] === 'NEW_PASSWORD_REQUIRED') {

        ret = {
          challengeName: 'NEW_PASSWORD_REQUIRED'
        }
      } else {

        let session = await this.Auth.currentSession();
        console.log(session)
        ret = {
          jwtTokn: session.getAccessToken().getJwtToken(),
          idToken: session.getIdToken().getJwtToken(),
          reToken: session.getRefreshToken().getToken(),
          key: process.env.KEY
        }
      }
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
