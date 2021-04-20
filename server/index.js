import Web3 from "web3"


import TinyfoxIndexer from './lib/tinyfox-indexer.js'


function init(){
    console.log('boot server ') 

    let provider_url = 'https://kovan.optimism.io/'
    let web3 = new Web3(provider_url)

   let tinyFoxIndexer = new TinyfoxIndexer()
   tinyFoxIndexer.init(web3)
}







init() 