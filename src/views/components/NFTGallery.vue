<template>
  <div class=" ">
       
  
    
    <div v-for="tokenData of tokensArray" class="m-4 p-2 inline-block border-2 border-black">
      
      <img v-bind:src="tokenData.img_src" width="200px" height="200px" /> 
      
       <div> NFT Id: {{tokenData.id }}  </div>
      <div class="text-center">    <div class="truncate text-center" style="max-width:150px;margin:0 auto;"> {{ tokenData.owner }} </div>  </div>
        
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
