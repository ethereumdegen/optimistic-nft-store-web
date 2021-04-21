<template>
  <div class=" ">
       
  
    
    <div v-for="tokenData of tokensArray" class="m-4 p-2 inline-block border-2 border-black">
        {{tokenData }}

        
    </div>

    <div v-if="tokensArray.length ==0">
      No results found.
    </div>
    
  
       
  </div>
</template>


<script>
 
 

export default {
  name: 'NFTGallery',
  props: ['tokensArray',  'web3Plug'],
  data() {
    return { 
    }
  },
  
  mounted(){
      
     // this.nftType = BuyTheFloorHelper.getNameFromContractAddress(this.nftContractAddress, this.projectId, this.web3Plug.getActiveNetId())
       

     // this.fetchOwnedTokenIds()


  },
  methods: {
        
  }
}
</script>
