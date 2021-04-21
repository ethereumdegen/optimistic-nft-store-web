
import TinyFox from 'tinyfox'
import fs from 'fs'
import path from 'path'

const nftContractJSON =  fs.readFileSync( 'src/contracts/NFT_Fun.json' , 'utf8')  
const nftContractData = JSON.parse(nftContractJSON)

export default class NFTDataIndexer{

    constructor(web3,mongoInterface){

        this.mongoInterface = mongoInterface
        this.web3 = web3

        this.init(web3,mongoInterface)
    }

    async init(web3, mongoInterface){
        

        this.initializeTokenData()
        setInterval( this.initializeTokenData.bind(this), 5000) ;


        setInterval( this.queryTokenData.bind(this), 1000) ;

       



     /*   this.tinyFox = new TinyFox()

        await this.tinyFox.init({suffix: 'optimism_kovan'})


        let tinyfoxConfig = {
            contractType: 'ERC721',
            contractAddress: '0xC9a43158891282A2B1475592D5719c001986Aaec' ,
            startBlock: 30000,
            
            courseBlockGap: 1000, 
            fineBlockGap: 10,
            indexRate: 10000,
            updateBlockNumberRate:60000,
            logging:true 
        }  

         this.tinyFox.startIndexing( this.web3, tinyfoxConfig )  */
        
        /*  
        let nftContract = new web3.eth.Contract(nftContractData.abi ,tinyfoxConfig.contractAddress)

        nftContract.getPastEvents('allEvents', {
           
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, events){ console.log(events); })
        .then(function(events){
            console.log(events) // same results as the optional callback above
        });
        */

    }

    //take erc721_balances and put it in to  erc721_assets
    async initializeTokenData(){
        let erc721Holders = await this.mongoInterface.findAll('erc721_balances',{})

        for(let holder of erc721Holders){
            for(let tokenId of holder.tokenIds){
                await this.initializeERC721AssetWithTokenId(  tokenId , holder.accountAddress, holder.contractAddress )
            }
        }


    }

    async initializeERC721AssetWithTokenId(tokenId, ownerAddress, contractAddress){
        let existingAsset = await this.mongoInterface.findOne('erc721_assets',{tokenId: tokenId})
        if(!existingAsset){
            console.log('initialize token with id', tokenId)
            await this.mongoInterface.insertOne('erc721_assets',{tokenId: tokenId, ownerAddress:ownerAddress, contractAddress:contractAddress})
        } 
    }
    
    async queryTokenData(){  
        let nextTokenMissingData = await this.mongoInterface.findOne('erc721_assets',{tokenData:null}) 

        if(nextTokenMissingData){

            let newTokenData = {tokenURI: null} 

            let nftContract = new this.web3.eth.Contract(nftContractData.abi , nextTokenMissingData.contractAddress )


            newTokenData.tokenURI = await nftContract.methods.tokenIdToUri(nextTokenMissingData.tokenId ).call()

            await this.mongoInterface.updateOne('erc721_assets',{_id:nextTokenMissingData._id},   {tokenData:newTokenData}  ) 

        }
    }



}