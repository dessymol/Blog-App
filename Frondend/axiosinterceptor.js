import axios from "axios";


//To create a new instance of axios
const axiousInstance=axios.create({
    baseURL:'/api', //👉 base URL for all requests
})
axiousInstance.interceptors.request.use((config)=>{  //To read the value of 
    console.log(config);
    const accessToken=localStorage.getItem("token")
    if(accessToken){
        if(config){
            config.headers.token=accessToken; //Keep the token in the header part in the http request 
        }
    }
    return config;
},(error)=>{
    return Promise.reject(error)
})
export default axiousInstance;
