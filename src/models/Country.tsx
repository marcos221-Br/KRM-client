export class Country{
    private id:Number;
    private countryName:String;

    public constructor(){
        this.id = 0;
        this.countryName = '';
    }

    public setId(id:Number){
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    public setCountryName(countryName:String){
        this.countryName = countryName;
    }

    public getCountryName(){
        return this.countryName;
    }
}