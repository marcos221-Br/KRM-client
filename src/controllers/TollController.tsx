import { HttpConection } from "../components/Json";
import { Toll } from "../models/Toll";

export class TollController{

    private http;

    public constructor(){
        this.http = new HttpConection('8082');
    }

    public findAllTolls(){
        return this.http.sendJson('/toll','GET');
    }

    public findToll(tollId:Number){
        return this.http.sendJson('/toll/' + tollId,'GET');
    }

    public createToll(toll:Toll){
        let json = JSON.stringify({ tollId: toll.getTollId(), tollName: toll.getTollName(), price: toll.getPrice(), emptyCharge: toll.getEmptyCharge(), concessionaire: { id: toll.getConcessionaire() }});
        return this.http.sendJson('/toll','POST',json);
    }

    public updateToll(toll:Toll){
        let json = JSON.stringify({ id: toll.getId(), tollId: toll.getTollId(), tollName: toll.getTollName(), price: toll.getPrice(), emptyCharge: toll.getEmptyCharge(), concessionaire: { id:toll.getConcessionaire() }});
        return this.http.sendJson('/toll/' + toll.getId(),'PUT',json);
    }

    public deleteToll(toll:Toll){
        return this.http.sendJson('/toll/' + toll.getId(),'DELETE');
    }
}