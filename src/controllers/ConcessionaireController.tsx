import { sendJson } from "../components/Json";
import { Concessionaire } from "../models/Concessionaire";

export class ConcessionaireController{

    public constructor(){

    }

    public findAllConcessionaires(){
        return sendJson('/concessionaire','GET');
    }

    public findConcessionaire(concessionaireId:Number){
        return sendJson('/concessionaire/' + concessionaireId,'GET');
    }

    public createConcessionaire(concessionaire:Concessionaire){
        let json = JSON.stringify({ concessionaireId: concessionaire.getConcessionaireId(), concessionaireName: concessionaire.getConcessionaireName() });
        return sendJson('/concessionaire','POST',json);
    }

    public updateConcessionaire(concessionaire:Concessionaire){
        let json = JSON.stringify(concessionaire);
        return sendJson('/concessionaire/' + concessionaire.getId(),'PUT',json);
    }

    public deleteConcessionaire(concessionaire:Concessionaire){
        return sendJson('/concessionaire/' + concessionaire.getId(),'DELETE');
    }
}