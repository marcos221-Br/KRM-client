import { Car } from "../models/Car";
import { sendJson } from "../components/Json";

export class CarController{

    public constructor(){
        
    }

    public findCar(plate:string){
        return sendJson('/car/' + plate,'GET');
    }

    public createCar(car:Car){
        let json = JSON.stringify({ reindeer: car.getReindeer(), plate: car.getPlate(), model: car.getModel(), year: car.getYear(), kilometer: car.getKilometer(),
                                    registration_date: car.getRegistrationDate(), status: car.getStatus() });
        return sendJson('/car','POST',json);
    }

    public updateCar(car:Car){
        let json = JSON.stringify(car);
        return sendJson('/car/' + car.getCarId(),'PUT',json);
    }

    public deleteCar(car:Car){
        return sendJson('/car/' + car.getCarId(),'DELETE');
    }
}