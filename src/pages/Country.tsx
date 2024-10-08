import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import './Country.css'
import { Country } from "../models/Country";
import { CountryController } from "../controllers/CountryController";
import pencil from '../images/pencil-line.svg';
import trashCan from '../images/delete-bin-5-line.svg';
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

var countryController = new CountryController();
var country = new Country();

function findAllCountries(){
    countryController.findAllCountries().then(function(response){
        let list = (document.getElementById('countryList') as HTMLIonListElement);
        if(response.data.length > 0){
            for(let i = 0; i < response.data.length; i++){
                let id = document.createElement('ion-label');
                let countryName = document.createElement('ion-label');
                id.innerHTML = response.data[i].id;
                countryName.innerHTML = response.data[i].countryName;
                countryName.setAttribute('id',response.data[i].countryName);
                let editIcon = document.createElement('ion-icon');
                let editButton = document.createElement('ion-button');
                editIcon.setAttribute('icon',pencil);
                editButton.setAttribute('id',response.data[i].countryName);
                editButton.appendChild(editIcon);
                editButton.addEventListener('click',findCountry);
                let deleteIcon = document.createElement('ion-icon');
                let deleteButton = document.createElement('ion-button');
                deleteIcon.setAttribute('icon',trashCan);
                deleteButton.setAttribute('id',response.data[i].id);
                deleteButton.appendChild(deleteIcon);
                deleteButton.addEventListener('click',deleteCountry);
                let ionItem = document.createElement('ion-item');
                ionItem.appendChild(id);
                ionItem.appendChild(countryName);
                ionItem.appendChild(editButton);
                ionItem.appendChild(deleteButton);
                if(i == 0){
                    list.replaceChildren(ionItem);
                }else{
                    list.appendChild(ionItem);
                }
            }
        }else{
            list.innerHTML = '';
        }
    })
}

function findCountry(value:any){
    countryController.findCountry(value.target.id).then(function(response){
        (document.getElementById('id') as HTMLInputElement).value = response.data.id;
        (document.getElementById('countryName') as HTMLInputElement).value = response.data.countryName;
    })
}

function saveCountry(){
    let id = (document.getElementById('id') as HTMLInputElement).value;
    country.setCountryName((document.getElementById('countryName') as HTMLInputElement).value);
    if(id == ''){
        countryController.createCountry(country).then(function(response){
            if(response.status == 200){
                clearInputs();
                findAllCountries();
                alert(response.data.countryName + ' criado com sucesso!');
            }else if(response.status == 422){
                alert("País já cadastrado anteriormente");
            }else{
                alert("Erro inesperado!");
            }
        });
    }else{
        country.setId(parseInt(id));
        countryController.updateCountry(country).then(function(response){
            if(response.status == 200){
                clearInputs();
                findAllCountries();
                alert(response.data.countryName + ' atualizado com sucesso!');
            }else if(response.status == 422){
                alert('País já cadastrado anteriormente');
            }else{
                alert("Erro inesperado!")
            }
        });
    }
}

function deleteCountry(value:any){
    let countryName = value.target.parentElement.children[1].id;
    country.setId(value.target.id);
    countryController.deleteCountry(country).then(function(){
      clearInputs();
      alert(countryName + ' excluido com sucesso!');
      findAllCountries();
    })
}

function clearInputs(){
    (document.getElementById('id') as HTMLInputElement).value = '';
    (document.getElementById('countryName') as HTMLInputElement).value = '';
}

const CountryPage: React.FC = () => {
    var { handleSubmit } = useForm();
    findAllCountries();
    const [countryName, setCountryName] = useState<string>();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/car'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Países</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="country">
                    <div>
                        <h1>Cadastro de países</h1>
                        <form onSubmit={handleSubmit(saveCountry)}>
                            <IonItem>
                                <IonInput label="Id País" id="id" disabled></IonInput>
                            </IonItem>
                            <IonItem>
                                <label htmlFor="countryName">Nome País</label>
                                <InputText id='countryName' value={countryName} onChange={(e) => setCountryName(e.target.value)} keyfilter={/^[^<>*!@#$%¨()_+{};:"'0-9]+$/} required placeholder="Digite o nome do país"></InputText>
                            </IonItem>
                            <br />
                            <div className="buttons">
                                <IonButton size="default" type="submit">Salvar</IonButton>
                            </div>
                        </form>
                    </div>
                    <br />
                    <IonList id="countryList"></IonList>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default CountryPage;