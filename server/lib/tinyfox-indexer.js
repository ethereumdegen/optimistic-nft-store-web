
import TinyFox from 'tinyfox'
import fs from 'fs'
import path from 'path'

const nftContractJSON =  fs.readFileSync( 'src/contracts/NFT_Fun.json' , 'utf8')  
const nftContractData = JSON.parse(nftContractJSON)

export default class TinyfoxIndexer{

    async init(web3){
        this.web3 = web3

        this.tinyFox = new TinyFox()

        await this.tinyFox.init({suffix: 'optimism_kovan'})


        let tinyfoxConfig = {
            contractType: 'ERC721',
            contractAddress: '0xC9a43158891282A2B1475592D5719c001986Aaec' ,
            startBlock: 30000,
            
            courseBlockGap: 1000, 
            fineBlockGap: 50,
            indexRate: 10000,
            updateBlockNumberRate:60000,
            logging:true 
        }  

         this.tinyFox.startIndexing( this.web3, tinyfoxConfig )  
        
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
    



}