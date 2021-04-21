import Web3 from "web3"


import TinyfoxIndexer from './lib/tinyfox-indexer.js'
import FileHelper from './lib/file-helper.js'

import MongoInterface from './lib/mongo-interface.js' 
 
import APIInterface from './lib/api-interface.js'

let envmode = process.env.NODE_ENV

 let serverConfigFile = FileHelper.readJSONFile('./server/serverconfig.json')
 let serverConfig = serverConfigFile[envmode]


function init(){
    console.log('boot server ') 

    let provider_url = serverConfig.web3provider
    let web3 = new Web3(provider_url)

   let tinyFoxIndexer = new TinyfoxIndexer()
   tinyFoxIndexer.init(web3)

   let mongoInterface = new MongoInterface('tinyfox_optimism_kovan')

    let apiInterface = new APIInterface(web3, mongoInterface,serverConfig)

}







init() 