import axios from "axios";

export class HttpConection{

    private url = 'http://localhost:';

    public constructor(port:string){
        this.url += port + '/api';
    }

    public static setHeader(key:string,value:string){
        axios.defaults.headers.common[key] = value
    }

    public sendJson(endpoint:string,type:string,data:any = null):Promise<any> {
        let result:any
        switch (type) {
            case 'GET':
                result = axios.get(this.url + endpoint).then(function(response) {
                    return response;
                }).catch(function(error){
                    return error;
                });
                break;
            
            case 'POST':
                result = axios.post(this.url + endpoint,data).then(function(response) {
                    return response;
                }).catch(function(error){
                    return error;
                });
                break;
            
            case 'PUT':
                result = axios.put(this.url + endpoint,data).then(function(response) {
                    return response;
                }).catch(function(error){
                    return error;
                });
                break;

            case 'DELETE':
                result = axios.delete(this.url + endpoint).then(function(response) {
                    return response;
                }).catch(function(error){
                    return error;
                });
                break;
        
            default:
                break;
        }
        return result
    }
}