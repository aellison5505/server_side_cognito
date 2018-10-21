//entry
import {API_APP} from './server'
//import * as http_proxy from 'http-proxy'
//import * as fs from 'fs'
import * as http from 'http'
//import {ProxyServer} from './proxy_server'



export class http_server {

private port:number;
private apiServer:any;

  constructor(){
    this.port = 8443;
    this.server();

  }

  private server() {
    let api_server = new API_APP();



  //  let proxy = http_proxy.createProxyServer({});

  //  this.proxyServer =  https.createServer(this.credentials, (req, res) => proxy.web(req, res, { target: 'http://127.0.0.1:5984' }));
  //  this.proxyServer =  http.createServer(api_proxy.app);
    this.apiServer = http.createServer(api_server.app)
  }

  start() {
  //  this.proxyServer.listen(this.portProxy);
    this.apiServer.listen(this.port);
  }

}
