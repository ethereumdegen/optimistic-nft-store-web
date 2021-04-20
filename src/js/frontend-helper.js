

  
 
import axios from "axios";

const env = process.env.NODE_ENV

const clientConfig = require('../config/clientConfig.json')[env]
 

export default class FrontendHelper {

    constructor( ){
      

    }



    static async requestAddOptimismNetwork(){

        
        let req = await window.ethereum.request({ 
        method: 'wallet_addEthereumChain',
        params:[ {
            "chainId": "0x45",
        "chainName": "Optimism Kovan Testnet",
        "rpcUrls":["https://kovan.optimism.io/"]
        
        } ] }); 
        console.log('req',req)
        
    }
    


    static getRouteTo(dest){
 
        return clientConfig.external_routes[dest]
      

    }


}