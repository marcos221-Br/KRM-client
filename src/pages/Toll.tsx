import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
import './Toll.css'
import { ConcessionaireController } from "../controllers/ConcessionaireController";
import { Toll } from "../models/Toll";
import { TollController } from "../controllers/TollController";
import pencil from '../images/pencil-line.svg';
import trashCan from '../images/delete-bin-5-line.svg';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

var concessionaireController = new ConcessionaireController();
var tollController = new TollController();
var toll = new Toll();

function findAllTolls(){
    tollController.findAllTolls().then(function(response){
        let list = (document.getElementById('tollList') as HTMLIonListElement);
        if(response.length > 0){
            for(let i = 0; i< response.length; i++){
                let concessionaire = document.createElement('ion-label');
                let tollId = document.createElement('ion-label');
                let tollName = document.createElement('ion-label');
                concessionaire.innerHTML = response[i].concessionaire.concessionaireName;
                tollId.innerHTML = response[i].tollId;
                tollName.innerHTML = response[i].tollName;
                let editIcon = document.createElement('ion-icon');
                let editButton = document.createElement('ion-button');
                editIcon.setAttribute('icon',pencil);
                editButton.setAttribute('id',response[i].tollId);
                editButton.appendChild(editIcon);
                editButton.addEventListener('click',findToll);
                let deleteIcon = document.createElement('ion-icon');
                let deleteButton = document.createElement('ion-button');
                deleteIcon.setAttribute('icon',trashCan);
                deleteButton.setAttribute('id',response[i].tollId);
                deleteButton.appendChild(deleteIcon);
                deleteButton.addEventListener('click',deleteToll);
                let ionItem = document.createElement('ion-item');
                ionItem.appendChild(concessionaire);
                ionItem.appendChild(tollId);
                ionItem.appendChild(tollName);
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

function findConcessionaires(){
    concessionaireController.findAllConcessionaires().then(function(response){
        if(response.length != 0){
            let concessionaireSelector = (document.getElementById('concessionaire') as HTMLIonSelectElement);
            for (let index = 0; index < response.length; index++) {
                let concessionaire = document.createElement('ion-select-option');
                concessionaire.innerHTML = response[index].concessionaireId + ' | ' + response[index].concessionaireName;
                concessionaire.value = response[index].id;
                if(index != 0){
                    concessionaireSelector.appendChild(concessionaire);
                }else{
                    concessionaireSelector.replaceChildren(concessionaire);
                }
            }
        }
    });
}

function findToll(value:any){
    tollController.findToll(parseInt(value.target.id)).then(function(response){
        (document.getElementById('id') as HTMLInputElement).value = response.id;
        (document.getElementById('tollId') as HTMLInputElement).value = response.tollId;
        (document.getElementById('tollName') as HTMLInputElement).value = response.tollName;
        (document.getElementById('price') as HTMLInputElement).value = response.price;
        (document.getElementById('emptyCharge') as HTMLIonToggleElement).checked = response.emptyCharge;
        let concessionaireSelector = (document.getElementById('concessionaire') as HTMLIonSelectElement);
        let concessionaire = document.createElement('ion-select-option');
        concessionaire.innerHTML = response.concessionaire.concessionaireId + ' | ' + response.concessionaire.concessionaireName;
        concessionaire.value = response.concessionaire.id;
        concessionaireSelector.replaceChildren(concessionaire);
        concessionaireSelector.value = response.concessionaire.id;
    })
}

function saveToll(){
    if((document.getElementById('concessionaire') as HTMLIonSelectElement).value !== undefined){
        let id = (document.getElementById('id') as HTMLInputElement).value;
        toll.setConcessionaire(parseInt((document.getElementById('concessionaire') as HTMLIonSelectElement).value));
        toll.setEmptyCharge((document.getElementById('emptyCharge') as HTMLIonToggleElement).checked);
        toll.setPrice(parseFloat((document.getElementById('price') as HTMLInputElement).value.replace('R$','').replace(',','.')));
        toll.setTollId(parseInt((document.getElementById('tollId') as HTMLInputElement).value));
        toll.setTollName((document.getElementById('tollName') as HTMLInputElement).value);
        if(id == ''){
            tollController.findToll(toll.getTollId()).then(function(response){
                if(response.id === undefined){
                    tollController.createToll(toll).then(function(response){
                        (document.getElementById('id') as HTMLInputElement).value = response.id;
                        findAllTolls();
                        clearInputs();
                        alert(response.tollName + ' com código ' + response.tollId + ' cadastrada com sucesso!');
                    }).catch(error => alert('Sem acesso ao sistema'));
                }else{
                    alert('Praça de código ' + response.id + ' já se encontra cadastrada!');
                }
            })
        }else{
            toll.setId(parseInt(id));
            tollController.updateToll(toll).then(function(response){
                findAllTolls();
                clearInputs();
                alert('Praça de nome ' + response.tollName + ' com código ' + response.tollId + ' atualizada com sucesso!');
            }).catch(error => alert('Sem acesso ao sistema'));
        }
    }else{
        alert("Necessário fornecer uma concessionária!");
    }
}

function deleteToll(value:any){
    let tollId = parseInt(value.target.id);
    tollController.findToll(tollId).then(function(response){
        let tollName = response.tollName;
        toll.setId(response.id);
        tollController.deleteToll(toll).then(function(){
            clearInputs();
            findAllTolls();
            alert('Praça de nome ' + tollName + ' com código ' + tollId + ' excluida com sucesso!');
        })
    })
}

function clearInputs(){
    (document.getElementById('concessionaire') as HTMLIonSelectElement).value = '';
    (document.getElementById('id') as HTMLInputElement).value = '';
    (document.getElementById('tollId') as HTMLInputElement).value = '';
    (document.getElementById('tollName') as HTMLInputElement).value = '';
    (document.getElementById('price') as HTMLInputElement).value = '';
    (document.getElementById('emptyCharge') as HTMLIonToggleElement).checked = false;
}

const TollPage: React.FC = () => {
    var { handleSubmit } = useForm();
    findAllTolls();
    const [tollId, setTollId] = useState<number>();
    const [tollName, setTollName] = useState<string>();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Praças</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="toll">
                    <div>
                        <h1>Cadastro de praças</h1>
                        <form onSubmit={handleSubmit(saveToll)}>
                            <IonItem>
                                <IonInput label="Id praça" id="id" disabled></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel id="label">
                                    <IonSelect label="Concessionária" id="concessionaire" placeholder="Selecione a concessionária" onClick={findConcessionaires} interface="popover"></IonSelect>
                                    <a href="/concessionaire">Nova concessionária +</a>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <label htmlFor="tollId">Cód. Praça</label>
                                <InputNumber inputId='tollId' value={tollId} onValueChange={(e) => setTollId(e.value)} useGrouping={false} required min={0} placeholder="Digite o código da praça"></InputNumber>
                            </IonItem>
                            <IonItem>
                                <label htmlFor="tollName">Nome Praça</label>
                                <InputText id='tollName' value={tollName} onChange={(e) => setTollName(e.target.value)} keyfilter='alphanum' required placeholder="Digite o nome da praça"></InputText>
                            </IonItem>
                            <IonItem>
                                <IonInput id="price" label="Preço" type="number" step="0.01" placeholder="Digite o valor da praça" min={0}>
                                    <IonLabel slot="start">R$</IonLabel>
                                </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonToggle id="emptyCharge">Cobra Vazio</IonToggle>
                            </IonItem>
                            <br />
                            <div className="buttons">
                                <IonButton size="default" type="submit">Salvar</IonButton>
                            </div>
                        </form>
                    </div>
                    <br />
                    <IonList id="tollList"></IonList>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default TollPage;