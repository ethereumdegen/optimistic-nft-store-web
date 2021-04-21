 
  //  import Web3Helper from './web3-helper.js'
  //  import BidPacketUtils from '../../src/js/bidpacket-utils.js'
    
    import FileHelper from './file-helper.js'

    import web3utils from 'web3-utils'
 //   import ApplicationManager from './application-manager.js'
    
 
    export default class APIHelper  {
    
        constructor(   ){
           
           
        }

        //http://localhost:3000/api/v1/somestuff
        static async handleApiRequest(request,   mongoInterface){
           
            let inputData = request.body 
            

          



            if(inputData.requestType == 'ERC721_balance_by_token'){
 
                let inputParameters = inputData.input

                let token = inputParameters.token 

                let results = await APIHelper.findAllERC721ByToken(token, mongoInterface)

               // await ApplicationManager.logNewRequest(appId,inputData.requestType,inputParameters,results, mongoInterface)

                return {success:true, input: inputParameters, output: results  }
            }


           


            return {success:false}
        }

        static async findAllERC721ByOwner(publicAddress,mongoInterface){
           // publicAddress = web3utils.toChecksumAddress(publicAddress)
            return await mongoInterface.findAll('erc721_balances',{accountAddress: publicAddress })
        }



        static async findAllERC721ByToken(publicAddress,mongoInterface){
           // publicAddress = web3utils.toChecksumAddress(publicAddress)
            return await mongoInterface.findAll('erc721_balances',{contractAddress: publicAddress })
        }
 

         
    }