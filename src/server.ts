//express server

import bodyParser from 'body-parser'
import express from 'express'

import { signOn } from './awsSignOn'
import { subForgotPw} from './awsSubForgotPw'
import { forgotPw } from './awsForgotPw'
import { completePW } from './awsCompletePW'



export class API_APP {
  private _app: express.Application;

  constructor(){

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
   this._app.post('/subfgpw', (req,res) => new subForgotPw(req, res));
   this._app.post('/forgotpw', (req,res) => new forgotPw(req, res));
   this._app.post('/completepw', (req,res) => new completePW(req, res));
   //this._app.put('/new_user', (req,res) => new new_user(req, res));
  // this._app.put('/change_pwd', (req,res) => new change_pwd(req, res));
//   this._app.delete('/change_user', (req,res) => new change_username(req, res));
   this._app.use('*', (req: express.Request, res: express.Response) => {
    // console.log('pass'+req.params[0]);
    res.status(404).send('Unauthorized');
  })
  }


}
