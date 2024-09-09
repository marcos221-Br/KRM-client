export class Toll{
    private id:Number;
    private concessionaire:Number;
    private tollId:Number;
    private tollName:String;
    private price:Number;
    private emptyCharge:Boolean;

    public constructor(){
        this.id = 0;
        this.concessionaire = 0;
        this.tollId = 0;
        this.tollName = '';
        this.price = 0;
        this.emptyCharge = false;
    }

    public setId(id:Number){
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    public setConcessionaire(concessionaire:Number){
        this.concessionaire = concessionaire;
    }

    public getConcessionaire(){
        return this.concessionaire;
    }

    public setTollId(tollId:Number){
        this.tollId = tollId;
    }

    public getTollId(){
        return this.tollId;
    }

    public setTollName(tollName:String){
        this.tollName = tollName;
    }

    public getTollName(){
        return this.tollName;
    }

    public setPrice(price:Number){
        this.price = price;
    }

    public getPrice(){
        return this.price;
    }

    public setEmptyCharge(emptyCharge:Boolean){
        this.emptyCharge = emptyCharge;
    }

    public getEmptyCharge(){
        return this.emptyCharge;
    }
}