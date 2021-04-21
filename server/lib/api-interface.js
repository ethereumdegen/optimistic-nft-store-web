
 
 import express from 'express'
 
 import cors from 'cors'
import fs from 'fs'
import path from 'path'

import  history from 'connect-history-api-fallback'
import  bodyParser from 'body-parser' 
 

import web3utils from 'web3-utils'

import http from 'http'
import https from 'https'

import APIHelper from './api-helper.js'
 
//import ApplicationManager from './application-manager.js'

export default class APIInterface  {

    constructor(web3, mongoInterface, serverConfig){
        this.mongoInterface = mongoInterface;
       
        this.web3 = web3;
        this.serverConfig=serverConfig;


        

        const app = express()

        //var server = http.createServer(app);

        let envmode = process.env.NODE_ENV

        var apiPort = 3000

        if(serverConfig.useHTTPS == true ){
          var server = https.createServer({
            cert: fs.readFileSync('/home/andy/deploy/cert/buythefloor.com.pem'),
            key: fs.readFileSync('/home/andy/deploy/cert/buythefloor.com.key')
          });
          console.log('--using https--')
         
        }else{
          
          var server = http.createServer(app);
        }
       
        

 
         app.use(cors());

 

        this.startWebServer(app, apiPort)
    }


    async startWebServer(app, apiPort){

     /* app.get('/api/v1/:query', async (req, res) => {
         
          
        let response = await APIHelper.handleApiRequest( req , this.mongoInterface )

        res.send(response)
      })*/

       app.use(express.json());


      app.post('/api/v1/:app_id', async (req, res) => {
         
     
        console.log('got api request', req.params , req.body    )

        
        let response = await APIHelper.handleApiRequest( req ,  this.mongoInterface )

        console.log('sending reply:', response   )

        res.send(response)
      }) 

 
     

     


      const staticFileMiddleware = express.static('dist');
      app.use(staticFileMiddleware);
      app.use(history({
        disableDotRule: true,
        verbose: true
      }));
      app.use(staticFileMiddleware);




      app.listen(apiPort, () => {
        console.log(`API Server listening at http://localhost:${apiPort}`)
      })


 

    }

 

}