import { AuthClass } from '@aws-amplify/auth';
import express from 'express'
import { AuthInit } from './AuthInit'
import { MyStorage } from "./MyStorage";


export class reAuth {
  private req: express.Request;
  private res: express.Response;
  private _Auth: AuthInit;
  private Auth: AuthClass;
  private store: MyStorage;

  constructor(req: express.Request, res: express.Response) {
    this._Auth = new AuthInit()
    this.Auth = new AuthClass(this._Auth.get_auth)
    this.store = this._Auth.storage;
    this.req = req;
    this.res = res;
    this.reNew(this.req.body.userId, this.req.body.idToken, this.req.body.reToken);

  }

  private async reNew(userId: string, idToken: string, reToken: string) {
    try {
      if (userId === undefined || idToken === undefined || reToken === undefined) {
        this.res.status(400).send('missing user or creds')
        return;
      }
      
      this.store.setItem(`CognitoIdentityServiceProvider.${process.env.userPoolWebClientId }.LastAuthUser`, userId);
      this.store.setItem(`CognitoIdentityServiceProvider.${process.env.userPoolWebClientId}.${userId}.idToken`, idToken);
      this.store.setItem(`CognitoIdentityServiceProvider.${process.env.userPoolWebClientId}.${userId}.refreshToken`, reToken);

      let session = await this.Auth.currentSession();
      console.log(session)
      let ret = {
        jwtToken: session.getAccessToken().getJwtToken(),
        idToken: session.getIdToken().getJwtToken(),
        reToken: session.getRefreshToken().getToken(),
        userId: userId,
        key: process.env.KEY 
      }
      this.res.set('Content-Type', 'application/json');
      this.res.status(200).send(ret); 
      return
    } catch (e) {
      console.log(e)
      this.res.status(500).send(
        {
       "message": e.message
      }
    );
      return
    }

  }
}
