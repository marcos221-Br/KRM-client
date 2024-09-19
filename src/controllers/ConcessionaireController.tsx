import { HttpConection } from "../components/Json";
import { Concessionaire } from "../models/Concessionaire";

export class ConcessionaireController{

    private http;

    public constructor(){
        this.http = new HttpConection('8082');
    }

    public findAllConcessionaires(){
        return this.http.sendJson('/concessionaire','GET');
    }

    public findConcessionaire(concessionaireId:Number){
        return this.http.sendJson('/concessionaire/' + concessionaireId,'GET');
    }

    public createConcessionaire(concessionaire:Concessionaire){
        let json = JSON.stringify(concessionaire);
        return this.http.sendJson('/concessionaire','POST',json);
    }

    public updateConcessionaire(concessionaire:Concessionaire){
        let json = JSON.stringify(concessionaire);
        return this.http.sendJson('/concessionaire/' + concessionaire.getId(),'PUT',json);
    }

    public deleteConcessionaire(concessionaire:Concessionaire){
        return this.http.sendJson('/concessionaire/' + concessionaire.getId(),'DELETE');
    }
}