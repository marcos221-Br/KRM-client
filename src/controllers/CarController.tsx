import { Car } from "../models/Car";
import { HttpConection } from "../components/Json";

export class CarController{

    private http;
    
    public constructor(){
        this.http = new HttpConection('8081');
    }

    public findCar(plate:String){
        return this.http.sendJson('/car/' + plate,'GET');
    }

    public createCar(car:Car){
        let json = JSON.stringify(car);
        return this.http.sendJson('/car','POST',json);
    }

    public updateCar(car:Car){
        let json = JSON.stringify(car);
        return this.http.sendJson('/car/' + car.getId(),'PUT',json);
    }

    public deleteCar(car:Car){
        return this.http.sendJson('/car/' + car.getId(),'DELETE');
    }

    public findAllCars(){
        return this.http.sendJson('/car','GET');
    }
}