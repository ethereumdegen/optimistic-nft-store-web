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
        
       <div class="  px-2 ">
          <div class="text-lg font-bold mb-4"> Mint an NFT   </div>

             
          <div  class=" " v-if="!connectedToWeb3">
              <NotConnectedToWeb3 />
          </div>

          <div  class=" px-4" v-if=" connectedToWeb3">



             <div v-if="chainId != 0x45" class="my-4 p-2 bg-blue-300"> Please set network to Optimism-Kovan Testnet</div>

  
 
              
           <div class="mb-4 inline-block ">
             <div class="flex flex-row">
              <label   class="block text-md font-medium font-bold text-gray-800  ">Token URI </label>
                  
                
            </div>
              <div class="flex flex-row">
              <div class="w-f ">
                    <input type="text"   v-model="formInputs.tokenURI"  class="text-gray-900 border-2 border-black font-bold px-4 text-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full py-4 pl-7 pr-12   border-gray-300 rounded-md" placeholder="ipfs://">
                </div> 
                 
              </div>

             
           
            </div>

 
 

          </div>

           <div class="py-4" v-if=" connectedToWeb3 && !submitComplete">
              
 
                 <div class="  p-4">
                     <div @click="mintNFT" class="select-none bg-blue-700 p-2 inline-block rounded hover:bg-blue-900 border-gray-800 border-2 cursor-pointer text-white" style=" text-shadow: 1px 1px #222;"> Mint NFT  </div>
                </div> 

                   <div  class="my-4 p-2 bg-blue-200 text-xs"> Hint: Use gas price of 0 if you have no Optimism-Kovan-WETH </div>


          </div>


           <div class="py-4" v-if=" newlyMintedTokenId ">
              
 
                 <div class="  p-4">
                     <router-link v-bind:to="'/show/'+newlyMintedTokenId" class="select-none bg-green-500 p-2 inline-block rounded hover:bg-blue-900 border-gray-800 border-2 cursor-pointer text-white no-underline" style=" text-shadow: 1px 1px #222;"> View newly minted NFT </router-link>
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

import Navbar from './components/Navbar.vue';
 
import Footer from './components/Footer.vue';
import TabsBar from './components/TabsBar.vue';
import GenericTable from './components/GenericTable.vue';
import GenericDropdown from './components/GenericDropdown.vue';
  
const ERC721ABI = require('../contracts/NFT_Fun.json').abi
 

var balanceInterval

export default {
  name: 'Mint',
  props: [],
  components: {Navbar, Footer, TabsBar, GenericTable, GenericDropdown,NotConnectedToWeb3},
  data() {
    return {
      web3Plug: new Web3Plug() , 

      chainId: null,
  
      formInputs:{tokenURI:'ipfs://'},

      tokenBalanceFormatted: null,
       
      connectedToWeb3: false ,
      submitComplete:false,
      

      newlyMintedTokenId: null 
    }
  },

  created(){

 
    this.web3Plug.getPlugEventEmitter().on('stateChanged', async function(connectionState) {
        console.log('stateChanged',connectionState);
         
        this.activeAccountAddress = connectionState.activeAccountAddress
        this.activeNetworkId = connectionState.activeNetworkId
        this.connectedToWeb3 = this.web3Plug.connectedToWeb3()
         
           this.chainId = this.web3Plug.getActiveNetId()
   
      }.bind(this));
   this.web3Plug.getPlugEventEmitter().on('error', function(errormessage) {
        console.error('error',errormessage);
         
        this.web3error = errormessage
       
      }.bind(this));

      this.web3Plug.reconnectWeb()
    
  

  },
   mounted: async function () {

     
   // balanceInterval = setInterval(this.fetchBalance,8000)
    
  }, 
  beforeDestroy(){
    clearInterval(balanceInterval)
  },
  methods: {

 
    async mintNFT(){
      console.log('start mint ')


      let accountAddress = this.web3Plug.getActiveAccountAddress()

      let chainId = this.web3Plug.getActiveNetId()

      console.log('chainId', chainId)

      let nftContractAddress = this.web3Plug.getContractDataForNetworkID(chainId)['nftfun'].address

     
      
      let nftContract = this.web3Plug.getCustomContract(ERC721ABI,  nftContractAddress );
 
    

       await nftContract.methods.mint( this.formInputs.tokenURI ).send({from:  accountAddress, gasPrice:0 }).then(async (result) => {

       
         let newTokenId= result.events.Transfer.returnValues._tokenId

           console.log('newTokenId, ',newTokenId)

          let uri = FrontendHelper.getRouteTo('api').concat('/api/v1/test_api_key')
          let inputData = {requestType: 'suggest_ERC721_existence',input: {token: "0xc9a43158891282a2b1475592d5719c001986aaec", id: newTokenId }}
          let response = await StarflaskAPIHelper.resolveStarflaskQuery(uri,inputData)

          this.newlyMintedTokenId = newTokenId
       }  )
    
      
     
    
    },
 
          
  }
}
</script>
