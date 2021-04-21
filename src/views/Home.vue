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

 
    this.web3Plug.getPlugEventEmitter().on('stateChanged', function(connectionState) {
        console.log('stateChanged',connectionState);
         
        this.activeAccountAddress = connectionState.activeAccountAddress
        this.activeNetworkId = connectionState.activeNetworkId 
         
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
                this.indexTokensArray = []
          } 
         
 

  }
}
</script>
