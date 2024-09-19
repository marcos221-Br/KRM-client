import { Country } from "../models/Country";
import { HttpConection } from "../components/Json";

export class CountryController{

    private http;

    public constructor(){
        this.http = new HttpConection('8083');
    }

    public findCountry(countryName:String){
        return this.http.sendJson('/country/' + countryName,'GET');
    }

    public createCountry(country:Country){
        let json = JSON.stringify(country);
        return this.http.sendJson('/country','POST',json);
    }

    public updateCountry(country:Country){
        let json = JSON.stringify(country);
        return this.http.sendJson('/country/' + country.getId(),'PUT',json);
    }

    public deleteCountry(country:Country){
        return this.http.sendJson('/country/' + country.getId(),'DELETE');
    }

    public findAllCountries(){
        return this.http.sendJson('/country','GET');
    }
}