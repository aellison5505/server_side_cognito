import { AuthClass } from '@aws-amplify/auth';
import express from 'express'
import { AuthInit } from './AuthInit'
import { MyStorage } from "./MyStorage";


export class signOff {
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
    this.logOut(this.req.body.userId, this.req.body.idToken, this.req.body.jwtToken);

  }

  private async logOut(userId: string, idToken: string, jwtToken: string) {
    try {
      if (userId === undefined || idToken === undefined) {
        this.res.status(400).send('missing user or creds')
        return;
      }
      
      this.store.setItem(`CognitoIdentityServiceProvider.${process.env.userPoolWebClientId }.LastAuthUser`, userId);
      this.store.setItem(`CognitoIdentityServiceProvider.${process.env.userPoolWebClientId}.${userId}.idToken`, idToken);
      this.store.setItem(`CognitoIdentityServiceProvider.${process.env.userPoolWebClientId}.${userId}.accessToken`, jwtToken);

      let cogUser = await this.Auth.signOut({ global: true });
      console.log(cogUser)
      let ret = {}
       
      
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
