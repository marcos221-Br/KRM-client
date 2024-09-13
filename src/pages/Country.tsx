import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import './Country.css'
import { Country } from "../models/Country";
import { CountryController } from "../controllers/CountryController";
import pencil from '../images/pencil-line.svg';
import trashCan from '../images/delete-bin-5-line.svg';
import { useForm } from "react-hook-form";

var countryController = new CountryController();
var country = new Country();

function findAllCountries(){
    countryController.findAllCountries().then(function(response){
        let list = (document.getElementById('countryList') as HTMLIonListElement);
        if(response.length > 0){
            for(let i = 0; i < response.length; i++){
                let id = document.createElement('ion-label');
                let countryName = document.createElement('ion-label');
                id.innerHTML = response[i].id;
                countryName.innerHTML = response[i].countryName;
                countryName.setAttribute('id',response[i].countryName);
                let editIcon = document.createElement('ion-icon');
                let editButton = document.createElement('ion-button');
                editIcon.setAttribute('icon',pencil);
                editButton.setAttribute('id',response[i].countryName);
                editButton.appendChild(editIcon);
                editButton.addEventListener('click',findCountry);
                let deleteIcon = document.createElement('ion-icon');
                let deleteButton = document.createElement('ion-button');
                deleteIcon.setAttribute('icon',trashCan);
                deleteButton.setAttribute('id',response[i].id);
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
        (document.getElementById('id') as HTMLInputElement).value = response.id;
        (document.getElementById('countryName') as HTMLInputElement).value = response.countryName;
    })
}

function saveCountry(){
    let id = (document.getElementById('id') as HTMLInputElement).value;
    country.setCountryName((document.getElementById('countryName') as HTMLInputElement).value);
    if(id == ''){
        countryController.findCountry(country.getCountryName()).then(function(response){
            if(response.id === undefined){
                countryController.createCountry(country).then(function(response){
                    (document.getElementById('id') as HTMLInputElement).value = response.id;
                    clearInputs();
                    findAllCountries();
                    alert(response.countryName + ' criado com sucesso!');
                }).catch(error => alert('Necessário preencher todos os campos para cadastrar o país!'));
            }else{
                alert(response.countryName + ' cadastrado anteriormente!');
            }
        }).catch(error => alert('Sem acesso ao sistema'));
    }else{
        country.setId(parseInt(id));
        countryController.updateCountry(country).then(function(response){
            clearInputs();
            findAllCountries();
            alert(response.countryName + ' cadastrado com sucesso!');
        }).catch(error => alert('Sem acesso ao sistema'));
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
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/'></IonBackButton>
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
                                <IonInput label="Id País" id="id" disabled labelPlacement="floating"></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput label="Nome País" id="countryName" labelPlacement="floating" placeholder="Digite o nome do país" required></IonInput>
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