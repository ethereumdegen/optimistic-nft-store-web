<template> 
<div class="   pt-8 relative pb-2 mb-12 text-white" style="min-height:300px">
            
            <div class="text-lg"> Guild Sponsors </div>    


              <div class="text-sm"> Coming soon... </div>          

 </div>
 </template>



<script>
    export default {
    name: 'FrontPageMedia',
    props: [ ],
    data() {
        return {
            startTime: 0
        }
    },
    created(){
        this.startTime= Date.now()

        setInterval(this.update,500)
    },
    methods: {
         update(){
             this.$forceUpdate()
         },
         getTimeElapsed(){
             return Date.now() - this.startTime
         }
    }
    }
</script>
