<template>

<div>

   <div class="section  bg-gray-200  border-b-4 border-black px-0 lg:px-1">

     <div class=" ">
        <Navbar 
        v-bind:web3Plug="web3Plug"
        
       />
     </div>


   </div>

  

   <div class="section  border-b-2 border-black" style="background:#1d1d1d;">
     <div class=" ">
       <div class=" ">

       </div>
       <div class="  flex lg:flex-row flex-col  ">
 
         <div class="  md:w-1/2  w-full mt-8 py-8  px-1  text-center">

            <div class="hidden text-white text-xl my-4">  Neutral grass-roots organization.  </div> 

        <div>
            <router-link to="/stake"  class="select-none no-underline bg-blue-700 mb-16 p-2 inline-block rounded hover:bg-blue-900 border-gray-800 border-2 cursor-pointer text-blue-100" style=" text-shadow: 1px 1px #222;"> Join the Guild   </router-link> 
        </div>
      
            <img src="@/assets/images/hero-dark.png" class="pl-4" style="margin:0 auto;" />

         </div>
         <div class="   md:w-1/2  w-full  text-center ">
           
            
           <FrontPageMedia />


         </div>
       </div>
     </div>
   </div>


    <div class="section  text-white  border-b-2 border-black " style="background:#222;">
     <div class="w-container  ">

         

          <div class=" w-2/3  mt-8 py-8" style="margin: 0 auto;">
           
                <div class="text-2xl text-center"> How It Works </div>

                <ul class=" "> 
                    <li class="my-4"> 1. Stake 0xBTC in the Miners Guild Contract Pool </li>
                    <li class="my-4" > 2. Neutral Dapps/Contracts donate their fees [in execution flow] to the Pool to earn Community Goodwill </li>
                    <li class="my-4" > 3. Unstake at any time to withdraw <span class="text-purple-300"> your original deposit + accrued donations </span>  </li>
               </ul>

                <div class="text-lg text-center my-16"> TLDR: This is a funnel for donations from community-driven dapps. </div>


                <p class="text-green-500"> Smart contracts which are structured to pay fees into the MinersGuild contract during execution flow are far more likely to be promoted, supported, and used by the 0xBTC community than ones that do not. </p>

         </div>

        
         


     </div>
   </div>



    
  <Footer/>

</div>
</template>


<script>



import Web3Plug from '../js/web3-plug.js'  

 
import FrontPageMedia from './components/FrontPageMedia.vue';
 
import Navbar from './components/Navbar.vue';
 
import Footer from './components/Footer.vue';
import TabsBar from './components/TabsBar.vue';
  
import StarflaskAPIHelper from '../js/starflask-api-helper.js';
import FrontendHelper from '../js/frontend-helper.js';


export default {
  name: 'Home',
  props: [],
  components: {Navbar, Footer, TabsBar, FrontPageMedia },
  data() {
    return {
      web3Plug: new Web3Plug() , 
      activePanelId: null, 
       

      
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
          setActivePanel(panelId){
              if(panelId == this.activePanelId){
                this.activePanelId = null;
                return 
              }
               this.activePanelId = panelId ;
          },
          onTabSelect(tabname){
            console.log(tabname)

              this.selectedTab = tabname.toLowerCase()


          },

          getRouteTo(dest){
            return FrontendHelper.getRouteTo(dest)
          }

       
 

  }
}
</script>
