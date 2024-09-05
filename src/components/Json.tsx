import axios, { HttpStatusCode } from "axios";

var url = 'http://localhost:8080/api';

export function setHeader(key:string,value:string){
    axios.defaults.headers.common[key] = value
}

export function sendJson(endpoint:string,type:string,data:any = null):Promise<any> {
    let result:any
    switch (type) {
        case 'GET':
            result = axios.get(url + endpoint).then(function(response) {
                if(response.status == HttpStatusCode.Ok){
                    return response.data
                }
            }).catch(error => console.error(error))
            break;
        
        case 'POST':
            result = axios.post(url + endpoint,data).then(function(response) {
                if(response.status == HttpStatusCode.Ok){
                    return response.data
                }
            }).catch(error => console.error(error))
            break;
        
        case 'PUT':
            result = axios.put(url + endpoint,data).then(function(response) {
                if(response.status == HttpStatusCode.Ok){
                    return response.data
                }
            }).catch(error => console.error(error))
            break;

        case 'DELETE':
            result = axios.delete(url + endpoint).then(function(response) {
                if(response.status == HttpStatusCode.Ok){
                    return response.data
                }
            }).catch(error => console.error(error))
            break;
    
        default:
            break;
    }
    return result
}