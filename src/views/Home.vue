<template>

<div>

   <div class="section  bg-gray-200  border-b-4 border-black px-0 lg:px-1">

     <div class=" ">
        <Navbar 
        v-bind:web3Plug="web3Plug"
        
       />
     </div>


   </div>


       <div class="section  text-white  border-b-2 border-black " style="background:#222;">
     <div class="w-container  py-16">

         
       <div class="text-2xl text-white mb-8 "> Create a new NFT </div>

          <router-link to="/mint" class="no-underline text-black hover:bg-purple-300 bg-white border-2 border-black p-2">Get Started</router-link>
         


     </div>
   </div>


   <div class="section  border-b-2 border-black" style="background:#1d1d1d;min-height:500px">
     <div class="w-container py-16">
     <div class="text-2xl text-white "> Recently Created NFTs </div>


       <div class=" text-white ">
       
       <NFTGallery
        v-bind:tokensArray="indexTokensArray" 
        v-bind:web3Plug="web3Plug"

        
        />
     </div>
      </div>
   </div>


   



    
  <Footer/>

</div>
</template>


<script>



import Web3Plug from '../js/web3-plug.js'  

 
import NFTGallery from './components/NFTGallery.vue';
 
import Navbar from './components/Navbar.vue';
 
import Footer from './components/Footer.vue'; 
import FrontendHelper from '../js/frontend-helper.js';

import StarflaskAPIHelper from '../js/starflask-api-helper.js'

export default {
  name: 'Home',
  props: [],
  components: {Navbar, Footer,  NFTGallery },
  data() {
    return {
      web3Plug: new Web3Plug() , 
      indexTokensArray: []  
      
    }
  },

 created(){

 
    this.web3Plug.getPlugEventEmitter().on('stateChanged', async function(connectionState) {
        console.log('stateChanged',connectionState);
         
        this.activeAccountAddress = connectionState.activeAccountAddress
        this.activeNetworkId = connectionState.activeNetworkId 

        await this.fetchNFTArrayForIndex()
         
      }.bind(this));
   this.web3Plug.getPlugEventEmitter().on('error', function(errormessage) {
        console.error('error',errormessage);
         
        this.web3error = errormessage
       
      }.bind(this));

      this.web3Plug.reconnectWeb()
   
       

  },
  mounted: function () {
         
    
  }, 
  methods: {
          async fetchNFTArrayForIndex( ){
            console.log('fetch array ')


            //let tokenDataArray = []
            

            let uri = FrontendHelper.getRouteTo('api').concat('/api/v1/test_api_key')
            let inputData = {requestType: 'ERC721_assets_by_token',input: {token: "0xc9a43158891282a2b1475592d5719c001986aaec" }}
            let response = await StarflaskAPIHelper.resolveStarflaskQuery(uri,inputData)


            console.log('fetch array 2' )
             this.indexTokensArray = []

            for(let nftAsset of response.output){
              console.log('nftAsset',nftAsset)

              
                this.indexTokensArray.push({ 
                   tokenId: nftAsset.tokenId,
                   ownerAddress: nftAsset.ownerAddress ,
                   tokenURI: nftAsset.tokenURI
                   } ) 
               

            }
 
            this.indexTokensArray.reverse()
          // this.indexTokensArray.sort((a,b)  => {a.id - b.id})
          console.log('this.indexTokensArray',this.indexTokensArray)
          } 



           
         
 

  }
}
</script>
