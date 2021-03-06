//express server

import bodyParser from 'body-parser'
import express from 'express'
import { eventContext } from 'aws-serverless-express/middleware';
import cors from 'cors'
import compression from 'compression'
import { signOn } from './awsSignOn'
import { subForgotPw} from './awsSubForgotPw'
import { forgotPw } from './awsForgotPw'
import { completePW } from './awsCompletePW'
import { signUp } from './awsSignUp'
import { confirmSU } from './awsConfirmSU'
import { signOff } from './awsSignOff'
import { reAuth } from './awsReAuth'



export class API_APP {
  private _app: express.Application;
  private _lambda:any;

  constructor(_lambda:any = false){
    this._lambda = _lambda;
    this._app = express();
    this.config();


  }

  private config() {
    this._app.use(cors());
    this._app.use(compression());
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({ extended: true }));
    if(this._lambda===true){
      console.log('lambda')
      this._app.use(eventContext())
    }
    this.routes();
  }

  get app(){
    return this._app;
  }

  private routes(){
   this._app.post('/login', (req,res) => new signOn(req, res));
   this._app.post('/subfgpw', (req,res) => new subForgotPw(req, res));
   this._app.post('/forgotpw', (req,res) => new forgotPw(req, res));
   this._app.post('/completepw', (req,res) => new completePW(req, res));
   this._app.post('/signup', (req,res) => new signUp(req, res));
   this._app.post('/confirmsup', (req,res) => new confirmSU(req, res));
   this._app.post('/signoff', (req,res) => new signOff(req, res));
   this._app.post('/renew', (req,res) => new reAuth(req, res));
   this._app.use('*', (req, res) => {
    // console.log('pass'+req.params[0]);
    req = req;
    res.status(404).send('Unauthorized');
  })
  }


}
