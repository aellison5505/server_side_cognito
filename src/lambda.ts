import { proxy, createServer } from 'aws-serverless-express';
import {API_APP} from './server'


export function hnadler (event:any, context:any){
    let _app = new API_APP(true);
    let server = createServer(_app.app);
    proxy(server,event, context);

}