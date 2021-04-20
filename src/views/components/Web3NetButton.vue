<template>
<div class="inline-block">
  <div v-if="usingCorrectNetwork" class="inline-block button text-gray-200  bg-gray-900 hover:bg-gray-700   font-bold py-0 px-1 rounded cursor-pointer">
    <div class="text-green-500 text-xl inline capitalize " style=" text-shadow: 0px 0px 2px #66dd00; ">  ·  </div>{{getNetworkName()}}
  </div>
<div v-if="!usingCorrectNetwork" @click="switchNetworkToOptimism" class="inline-block button text-gray-200  bg-gray-900 hover:bg-gray-700   font-bold py-0 px-1 rounded cursor-pointer">
       Switch Network
  </div>
 </div>
</template>


<script>
import FrontendHelper from '../../js/frontend-helper.js'


export default {
  name: 'Web3NetButton',
  props: ['web3Plug',"providerNetworkID"],
  components: {},
  data() {
    return {
      showResponsiveMenu: false,
      usingCorrectNetwork: false
    }
  },
   mounted: async function()
  { 
      //this is required because vue cant detect changes otherwise 
     this.web3Plug.getPlugEventEmitter().on('stateChanged', function(connectionState) {

       if(this.web3Plug.getActiveNetId() == 69){ 
         this.usingCorrectNetwork = true
       }

        this.$forceUpdate();
      }.bind(this));
  },
  
  methods: {
    getNetworkName(){
  
      return this.web3Plug.getWeb3NetworkName( this.web3Plug.getActiveNetId() )
    },
    switchNetworkToOptimism(){
      FrontendHelper.requestAddOptimismNetwork()
    }
  }
}
</script>