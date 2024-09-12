import { sendJson } from "../components/Json";
import { Country } from "../models/Country";

export class CountryController{

    public constructor(){

    }

    public findCountry(name:String){
        return sendJson('/country/' + name,'GET');
    }

    public createCountry(country:Country){
        let json = JSON.stringify({ countryName: country.getCountryName() });
        return sendJson('/country','POST',json);
    }

    public updateCountry(country:Country){
        let json = JSON.stringify(country);
        return sendJson('/country/' + country.getId(),'PUT',json);
    }

    public deleteCountry(country:Country){
        return sendJson('/country/' + country.getId(),'DELETE');
    }

    public findAllCountries(){
        return sendJson('/country','GET');
    }
}