<template>

<div>

   <div class="section  bg-gray-200  border-b-2 border-black px-0 lg:px-1">

     <div class=" ">
        <Navbar 
        v-bind:web3Plug="web3Plug" 
       />
     </div>


   </div>

  

   <div class="section   border-b-2 border-black text-white" style="background:#222;">
     <div class="py-16 w-container">
        
       <div class="w-column">
          <div class="text-lg font-bold"> Guild Members  </div>
          
         

          <div  class=" "  >

             
            
          <div class="text-xs">
            <ThiccTable 
              v-bind:labelsArray="[' ','shares']"
              v-bind:rowsArray="shareRowsArray"
              v-bind:clickedRowCallback="onClickedRow"
            />
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

 

import Navbar from './components/Navbar.vue';
 
import Footer from './components/Footer.vue';
import TabsBar from './components/TabsBar.vue';
import ThiccTable from './components/ThiccTable.vue';
 

import MathHelper from '../js/math-helper.js'

import StarflaskAPIHelper from '../js/starflask-api-helper.js'

import FrontendHelper from '../js/frontend-helper.js'

export default {
  name: 'Members',
  props: [],
  components: {Navbar, Footer, TabsBar, ThiccTable, NotConnectedToWeb3},
  data() {
    return {
      web3Plug: new Web3Plug() , 
      activePanelId: null,
      selectedTab:"bids",
      shareRowsArray:[],

       
      connectedToWeb3: false,
      currentBlockNumber: 0
    }
  },

  created(){

 
    this.web3Plug.getPlugEventEmitter().on('stateChanged', async function(connectionState) {
        console.log('stateChanged',connectionState);
         
        this.activeAccountAddress = connectionState.activeAccountAddress
        this.activeNetworkId = connectionState.activeNetworkId
        this.connectedToWeb3 = this.web3Plug.connectedToWeb3()
        this.currentBlockNumber = await this.web3Plug.getBlockNumber()

         
         
      }.bind(this));
   this.web3Plug.getPlugEventEmitter().on('error', function(errormessage) {
        console.error('error',errormessage);
         
        this.web3error = errormessage
       
      }.bind(this));

      this.web3Plug.reconnectWeb()
    
 

  },
  mounted: function () {
    
      
      this.fetchReserveBalances()
  }, 
  methods: {
           async fetchReserveBalances(){

            let apiURI = 'https://api.starflask.com/api/v1/testapikey'
            let inputData = {requestType: 'ERC20_balance_by_token', input: { token:'0x657223e3fdf539d92c40664db340097d5d6bd9f5' } } 
            let results = await StarflaskAPIHelper.resolveStarflaskQuery(apiURI ,  inputData   )
            console.log('results',results)
            
            let balances = results.output 

            this.shareRowsArray = [] 

            for(let balance of balances){
               if(balance.amount > 0){
                this.shareRowsArray.push({accountAddress: balance.accountAddress,  amount: MathHelper.rawAmountToFormatted(balance.amount,8)   })
           
               }
              }

          this.shareRowsArray.sort( (a, b) => b.amount - a.amount )

          },
          onClickedRow(row){
             

            window.location.href = this.web3Plug.getExplorerLinkForAddress(row.accountAddress)
          }
  }
}
</script>
