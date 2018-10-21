//express server
//import * as express  from 'express'
import bodyParser from 'body-parser'
import express from 'express'
//import {new_user} from './new_user'
//import { AuthInit } from './AuthInit'
//import Auth from '@aws-amplify/auth'
import { signOn } from './awsSignOn'



export class API_APP {
  private _app: express.Application;
//  private _Auth: AuthInit;
//  private aws_config: any;

  constructor(){
  //  this._Auth = new AuthInit()
//  this.aws_config = this._Auth.get_auth
    this._app = express();
    this.config();


  }

  private config() {

    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({ extended: true }));
    this.routes();
  }

  get app(){
    return this._app;
  }

  private routes(){
   this._app.post('/login', (req,res) => new signOn(req, res));
   //this._app.put('/new_user', (req,res) => new new_user(req, res));
  // this._app.put('/change_pwd', (req,res) => new change_pwd(req, res));
//   this._app.delete('/change_user', (req,res) => new change_username(req, res));
   this._app.use('*', (req: express.Request, res:express.Response) => {
    // console.log('pass'+req.params[0]);
    res.status(404).send('end');
  })
  }


}
