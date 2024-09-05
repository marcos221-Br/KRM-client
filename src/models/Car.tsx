export class Car{
    private carId:Number;
    private reindeer:String;
    private plate:String;
    private model:String;
    private year:Number;
    private kilometer:Number;
    private registration_date:String;
    private status:String;

    public constructor(){
        this.carId = 0;
        this.reindeer = '';
        this.plate = '';
        this.model = '';
        this.year = 0;
        this.kilometer = 0;
        this.registration_date = '';
        this.status = '';
    }

    public setCarId(carId:Number){
        this.carId = carId;
    }

    public getCarId(){
        return this.carId;
    }

    public setReindeer(reindeer:String){
        this.reindeer = reindeer;
    }

    public getReindeer(){
        return this.reindeer;
    }

    public setPlate(plate:String){
        this.plate = plate;
    }

    public getPlate(){
        return this.plate;
    }

    public setModel(model:String){
        this.model = model;
    }

    public getModel(){
        return this.model;
    }

    public setYear(year:Number){
        this.year = year;
    }

    public getYear(){
        return this.year;
    }

    public setKilometer(kilometer:Number){
        this.kilometer = kilometer;
    }

    public getKilometer(){
        return this.kilometer;
    }

    public setRegistrationDate(registration_date:String){
        this.registration_date = registration_date;
    }

    public getRegistrationDate(){
        return this.registration_date;
    }

    public setStatus(status:String){
        this.status = status;
    }

    public getStatus(){
        return this.status;
    }
}