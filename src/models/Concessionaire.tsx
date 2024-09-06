export class Concessionaire{
    private id:Number;
    private concessionaireId:Number;
    private concessionaireName:String;

    public constructor(){
        this.id = 0;
        this.concessionaireId = 0;
        this.concessionaireName = '';
    }

    public setId(id:Number){
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    public setConcessionaireId(concessionaireId:Number){
        this.concessionaireId = concessionaireId;
    }

    public getConcessionaireId(){
        return this.concessionaireId;
    }

    public setConcessionaireName(concessionaireName:String){
        this.concessionaireName = concessionaireName;
    }

    public getConcessionaireName(){
        return this.concessionaireName;
    }
}