import { sendJson } from "../components/Json";
import { Toll } from "../models/Toll";

export class TollController{

    public constructor(){

    }

    public findAllTolls(){
        return sendJson('/toll','GET');
    }

    public findToll(tollId:Number){
        return sendJson('/toll/' + tollId,'GET');
    }

    public createToll(toll:Toll){
        let json = JSON.stringify({ tollId: toll.getTollId(), tollName: toll.getTollName(), price: toll.getPrice(), emptyCharge: toll.getEmptyCharge(), concessionaire: { id: toll.getConcessionaire() }});
        return sendJson('/toll','POST',json);
    }

    public updateToll(toll:Toll){
        let json = JSON.stringify({ id: toll.getId(), tollId: toll.getTollId(), tollName: toll.getTollName(), price: toll.getPrice(), emptyCharge: toll.getEmptyCharge(), concessionaire: { id:toll.getConcessionaire() }});
        return sendJson('/toll/' + toll.getId(),'PUT',json);
    }

    public deleteToll(toll:Toll){
        return sendJson('/toll/' + toll.getId(),'DELETE');
    }
}