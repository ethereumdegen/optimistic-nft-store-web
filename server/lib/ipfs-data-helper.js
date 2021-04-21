
 
import axios from "axios";


export default class IPFSDataHelper {


  static async resolveGetRequest(uri ){

    return new Promise(   (resolve, reject) => {

      axios.get(uri  )
      .then((res) => {
         
           console.log('res', res )
           let results = res.data
          
     
            resolve(results)

       }) .catch((error) => {
           console.error(error)
           reject(error)
       })

   }); 

  }

 




}