export class Car{
    private id:Number;
    private renavam:String;
    private plate:String;
    private model:String;
    private year:Number;
    private kilometer:Number;
    private registrationDate:String;
    private status:String;

    public constructor(){
        this.id = 0;
        this.renavam = '';
        this.plate = '';
        this.model = '';
        this.year = 0;
        this.kilometer = 0;
        this.registrationDate = '';
        this.status = '';
    }

    public setId(id:Number){
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    public setRenavam(reindeer:String){
        this.renavam = reindeer;
    }

    public getRenavam(){
        return this.renavam;
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

    public setRegistrationDate(registrationDate:String){
        this.registrationDate = registrationDate;
    }

    public getRegistrationDate(){
        return this.registrationDate;
    }

    public setStatus(status:String){
        this.status = status;
    }

    public getStatus(){
        return this.status;
    }

    public toString(){
        return 'Car:\nId: ' + this.id + ',\nRenavam: ' + this.renavam + ',\nPlate: ' + this.plate + ',\nModel: ' + this.model + ',\nYear: ' + this.year + ',\nKilometer: ' + this.kilometer + ',\nRegistration Date: ' + this.registrationDate + ',\nStatus: ' + this.status;
    }
}