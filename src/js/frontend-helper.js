

  
 
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
        "rpcUrls":["https://kovan.optimism.io/"],
        "blockExplorerUrls":["https://kovan-l2-explorer.surge.sh/"]
        
        } ] }); 
        console.log('req',req)
        
    }
    


    static getRouteTo(dest){
 
        return clientConfig.external_routes[dest]
      


        
    }

    static getImageSourceFromIPFSHash(hash){
        if(!hash){
            return ''
        }

        return FrontendHelper.getCloudflareIPFSURL(hash)

    }

    static getIPFSHashFromString(hash){
        if(!hash){
            return ''
        }
        
        if(hash.includes("://")){
          hash = hash.split('://')[1]
        }
  
        return  hash  
    }

    static  getCloudflareIPFSURL(hash){
        hash = FrontendHelper.getIPFSHashFromString(hash)

        return `https://cloudflare-ipfs.com/ipfs/${hash}`
    }

      


}