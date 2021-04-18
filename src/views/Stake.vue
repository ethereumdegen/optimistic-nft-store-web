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
          <div class="text-lg font-bold mb-4"> Join the Miners Guild  </div>

          <div class="text-sm   mb-8"> Deposit 0xBTC in the DAO contract to earn 'Guild Reserve tokens'. Guild Reserve tokens can be redeemed back to the contract to withdraw your original deposit plus any fees that the DAO has accrued.   </div>
           
          <div  class=" " v-if="!connectedToWeb3">
              <NotConnectedToWeb3 />
          </div>

          <div  class=" px-4" v-if=" connectedToWeb3">
 
  
            
 

              
           <div class="mb-4 inline-block ">
             <div class="flex flex-row">
              <label   class="block text-md font-medium font-bold text-gray-800  ">Deposit Amount</label>
                  <div class="flex-grow"></div>
                <label   class="block text-xs font-xs text-blue-500  ">Balance:   {{tokenBalanceFormatted}}</label>

            </div>
              <div class="flex flex-row">
              <div class="w-f ">
                    <input type="number"   v-model="formInputs.currencyAmountFormatted"  class="text-gray-900 border-2 border-black font-bold px-4 text-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full py-4 pl-7 pr-12   border-gray-300 rounded-md" placeholder="0.00">
                </div> 
                 
              </div>
           
            </div>

 
 

          </div>

           <div class="py-4" v-if=" connectedToWeb3 && !submitComplete">
              
 
                 <div class="  p-4">
                     <div @click="depositClicked" class="select-none bg-blue-700 p-2 inline-block rounded hover:bg-blue-900 border-gray-800 border-2 cursor-pointer text-white" style=" text-shadow: 1px 1px #222;"> Deposit </div>
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
 

import Navbar from './components/Navbar.vue';
 
import Footer from './components/Footer.vue';
import TabsBar from './components/TabsBar.vue';
import GenericTable from './components/GenericTable.vue';
import GenericDropdown from './components/GenericDropdown.vue';
  
const GuildContractABI = require('../contracts/MinersGuild.json')

import FrontendHelper from '../js/frontend-helper.js'


var balanceInterval

export default {
  name: 'Stake',
  props: [],
  components: {Navbar, Footer, TabsBar, GenericTable, GenericDropdown,NotConnectedToWeb3},
  data() {
    return {
      web3Plug: new Web3Plug() , 
  
      formInputs:{},

      tokenBalanceFormatted: null,
       
      connectedToWeb3: false ,
      submitComplete:false
    }
  },

  created(){

 
    this.web3Plug.getPlugEventEmitter().on('stateChanged', async function(connectionState) {
        console.log('stateChanged',connectionState);
         
        this.activeAccountAddress = connectionState.activeAccountAddress
        this.activeNetworkId = connectionState.activeNetworkId
        this.connectedToWeb3 = this.web3Plug.connectedToWeb3()
        
            await this.fetchBalance()
         
      }.bind(this));
   this.web3Plug.getPlugEventEmitter().on('error', function(errormessage) {
        console.error('error',errormessage);
         
        this.web3error = errormessage
       
      }.bind(this));

      this.web3Plug.reconnectWeb()
    
 

  },
   mounted: async function () {

    let chainId = this.web3Plug.getActiveNetId()
     
    balanceInterval = setInterval(this.fetchBalance,8000)
    
  }, 
  beforeDestroy(){
    clearInterval(balanceInterval)
  },
  methods: {

 
    async depositClicked(){
      console.log('start deposit ')


      let accountAddress = this.web3Plug.getActiveAccountAddress()

      let chainId = this.web3Plug.getActiveNetId()
      let guildContractAddress = this.web3Plug.getContractDataForNetworkID(chainId)['minersguild'].address

       let tokenContractAddress = this.web3Plug.getContractDataForNetworkID(chainId)['0xbitcoin'].address

      let currencyDecimals  = 8 
      let currencyAmountRaw = MathHelper.formattedAmountToRaw(this.formInputs.currencyAmountFormatted,currencyDecimals) 
 
      let tokenContract = this.web3Plug.getTokenContract( tokenContractAddress );

    

      let response = await tokenContract.methods.approveAndCall( guildContractAddress, currencyAmountRaw, '0x0' ).send({from:  accountAddress })
    },


    async fetchBalance(){
       let chainId = this.web3Plug.getActiveNetId()
      let accountAddress = this.web3Plug.getActiveAccountAddress()

     
      let tokenContractAddress = this.web3Plug.getContractDataForNetworkID(chainId)['0xbitcoin'].address


      let tokenBalanceRaw = await  this.web3Plug.getTokenBalance(tokenContractAddress, accountAddress)

      console.log('tokenBalanceRaw', tokenBalanceRaw )

      this.tokenBalanceFormatted = parseFloat(   MathHelper.rawAmountToFormatted(tokenBalanceRaw  , 8  ) )
    }
          
  }
}
</script>
