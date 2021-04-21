<template>

<div>

   <div class="section bg-gray-200  border-b-2 border-black  lg:px-1 ">

     <div class=" ">
        <Navbar 
        v-bind:web3Plug="web3Plug" 
       />
     </div>


   </div>

  

   <div class="section  bg-white border-b-2 border-black">
     <div class="py-16 w-container">
        
       <div class="mb-4 flex px-2 border-2 border-gray-300 p-4">
       

 
              
           <div class="  border-2 border-black w-1/3 p-2">
             <div class="flex flex-col">

                  <div class="text-lg font-bold mb-4"> NFT Name    </div>                   

                 <div class="  font-bold mb-4"> Token ID: {{tokenId}}  </div>

         
               <div class="  font-bold mb-4 truncate"> Owner: {{assetData.ownerAddress }}  </div>

          
            </div>
              
           
            </div>
 
        <div class="   w-2/3 p-2">
             <div class="flex flex-col">

                  <img class="w-full" v-if="assetImageSource" v-bind:src="assetImageSource" /> 
              
                  <div class="w-full text-center bg-red-200" v-if="!assetImageSource"  > Invalid IPFS URI Data </div> 
              
            </div>
              
           
            </div>
 
          
       </div>
     </div>
   </div>


    


    
  <Footer/>

</div>
</template>


<script>



import NotConnectedToWeb3 from './components/NotConnectedToWeb3.vue'

import Web3Plug from '../js/web3-plug.js'  
 import MathHelper from '../js/math-helper.js'  
 
  import FrontendHelper from '../js/frontend-helper.js'  
   import StarflaskAPIHelper from '../js/starflask-api-helper.js'  
 
 import IPFSDataHelper from '../js/ipfs-data-helper.js'


import Navbar from './components/Navbar.vue';
 
import Footer from './components/Footer.vue';
import TabsBar from './components/TabsBar.vue';
import GenericTable from './components/GenericTable.vue';
import GenericDropdown from './components/GenericDropdown.vue';
  
const ERC721ABI = require('../contracts/NFT_Fun.json').abi
 
 

export default {
  name: 'Mint',
  props: [],
  components: {Navbar, Footer, TabsBar, GenericTable, GenericDropdown,NotConnectedToWeb3},
  data() {
    return {
      web3Plug: new Web3Plug() , 
   
       
      connectedToWeb3: false,

       assetImageSource: null,

      tokenId:null,
      assetData: { } ,
      imageSourceHash: null
        }
  },

  created(){

 
    this.web3Plug.getPlugEventEmitter().on('stateChanged', async function(connectionState) {
        console.log('stateChanged',connectionState);
         
        this.activeAccountAddress = connectionState.activeAccountAddress
        this.activeNetworkId = connectionState.activeNetworkId
        this.connectedToWeb3 = this.web3Plug.connectedToWeb3()
         
         
      }.bind(this));
   this.web3Plug.getPlugEventEmitter().on('error', function(errormessage) {
        console.error('error',errormessage);
         
        this.web3error = errormessage
       
      }.bind(this));

      this.web3Plug.reconnectWeb()
    
    this.tokenId = this.$route.params.tokenId;

    this.fetchNFTData( )

  },
   mounted: async function () {

     
    
  }, 
  beforeDestroy(){
    
  },
  methods: {

      async fetchNFTData(){
        console.log('fetch nft') 

          let uri = FrontendHelper.getRouteTo('api').concat('/api/v1/test_api_key')
            let inputData = {requestType: 'ERC721_asset_by_token_id',input: {token: "0xc9a43158891282a2b1475592d5719c001986aaec" , id:this.tokenId }}
            let response = await StarflaskAPIHelper.resolveStarflaskQuery(uri,inputData)

          
            this.assetData = response.output 

            console.log('this.assetData', this.assetData)


           let manifestFileURL = FrontendHelper.getCloudflareIPFSURL( this.assetData.tokenData.tokenURI )

          console.log('manifestFileURL',manifestFileURL)
          IPFSDataHelper.resolveGetRequest( manifestFileURL ).then((manifestFileJSON)=>{

             let imageFileHash = FrontendHelper.getIPFSHashFromString( manifestFileJSON.image ) 

              this.assetManifestData = manifestFileJSON

               this.assetImageSource = FrontendHelper.getCloudflareIPFSURL( imageFileHash )
  
               this.$forceUpdate(); 

            }  ).catch(error =>{
                this.ipfsDataErrored = true 

            } )

            //FrontendHelper.getImageSourceForIpfsHash(tokenData.tokenURI)

      },
      getImageSourceFromIPFSHash(hash){
        return FrontendHelper.getImageSourceFromIPFSHash(hash)

      }
      
    
 
          
  }
}
</script>
