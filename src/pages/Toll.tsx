import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonText, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
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
        if(response.data.length > 0){
            for(let i = 0; i< response.data.length; i++){
                let concessionaire = document.createElement('ion-label');
                let tollId = document.createElement('ion-label');
                let tollName = document.createElement('ion-label');
                concessionaire.innerHTML = response.data[i].concessionaire.concessionaireName;
                tollId.innerHTML = response.data[i].tollId;
                tollName.innerHTML = response.data[i].tollName;
                let editIcon = document.createElement('ion-icon');
                let editButton = document.createElement('ion-button');
                editIcon.setAttribute('icon',pencil);
                editButton.setAttribute('id',response.data[i].tollId);
                editButton.appendChild(editIcon);
                editButton.addEventListener('click',findToll);
                let deleteIcon = document.createElement('ion-icon');
                let deleteButton = document.createElement('ion-button');
                deleteIcon.setAttribute('icon',trashCan);
                deleteButton.setAttribute('id',response.data[i].tollId);
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
        if(response.data.length != 0){
            let concessionaireSelector = (document.getElementById('concessionaire') as HTMLIonSelectElement);
            for (let index = 0; index < response.data.length; index++) {
                let concessionaire = document.createElement('ion-select-option');
                concessionaire.innerHTML = response.data[index].concessionaireId + ' | ' + response.data[index].concessionaireName;
                concessionaire.value = response.data[index].id;
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
        (document.getElementById('id') as HTMLInputElement).value = response.data.id;
        (document.getElementById('tollId') as HTMLInputElement).value = response.data.tollId;
        (document.getElementById('tollName') as HTMLInputElement).value = response.data.tollName;
        (document.getElementById('price') as HTMLInputElement).value = response.data.price;
        (document.getElementById('emptyCharge') as HTMLIonToggleElement).checked = response.data.emptyCharge;
        let concessionaireSelector = (document.getElementById('concessionaire') as HTMLIonSelectElement);
        let concessionaire = document.createElement('ion-select-option');
        concessionaire.innerHTML = response.data.concessionaire.concessionaireId + ' | ' + response.data.concessionaire.concessionaireName;
        concessionaire.value = response.data.concessionaire.id;
        concessionaireSelector.replaceChildren(concessionaire);
        concessionaireSelector.value = response.data.concessionaire.id;
    })
}

function saveToll(){
    if((document.getElementById('concessionaire') as HTMLIonSelectElement).value !== undefined){
        let id = (document.getElementById('id') as HTMLInputElement).value;
        toll.setConcessionaire(parseInt((document.getElementById('concessionaire') as HTMLIonSelectElement).value));
        toll.setEmptyCharge((document.getElementById('emptyCharge') as HTMLIonToggleElement).checked);
        toll.setPrice(parseFloat((document.getElementById('price') as HTMLIonInputElement).value?.toString().replace('R$','')+''));
        toll.setTollId(parseInt((document.getElementById('tollId') as HTMLInputElement).value));
        toll.setTollName((document.getElementById('tollName') as HTMLInputElement).value);
        if(id == ''){
            tollController.createToll(toll).then(function(response){
                if(response.status == 200){
                    (document.getElementById('id') as HTMLInputElement).value = response.data.id;
                    findAllTolls();
                    clearInputs();
                    alert(response.data.tollName + ' com código ' + response.data.tollId + ' cadastrada com sucesso!');
                }else if(response.status == 422){
                    alert("Código da Praça duplicado!");
                }else{
                    alert("Erro inesperado!");
                }
            });
        }else{
            toll.setId(parseInt(id));
            tollController.updateToll(toll).then(function(response){
                if(response.status == 200){
                    findAllTolls();
                    clearInputs();
                    alert('Praça de nome ' + response.data.tollName + ' com código ' + response.data.tollId + ' atualizada com sucesso!');
                }else if(response.status == 422){
                    alert("Código da Praça duplicado!");
                }else{
                    alert("Erro inesperado!");
                }
            });
        }
    }else{
        alert("Necessário fornecer uma concessionária!");
    }
}

function deleteToll(value:any){
    let tollId = parseInt(value.target.id);
    tollController.findToll(tollId).then(function(response){
        let tollName = response.data.tollName;
        toll.setId(response.data.id);
        tollController.deleteToll(toll).then(function(){
            clearInputs();
            findAllTolls();
            alert('Praça de nome ' + tollName + ' com código ' + tollId + ' excluida com sucesso!');
        });
    });
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
                        <IonBackButton defaultHref='/car'></IonBackButton>
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
                                <IonLabel>
                                    <IonSelect label="Concessionária" id="concessionaire" placeholder="Selecione a concessionária" onClick={findConcessionaires} interface="popover"></IonSelect>
                                </IonLabel>
                                <IonItem routerLink="/concessionaire" id="item">
                                    <IonText slot="end" color={"primary"}>Nova Concessionária +</IonText>
                                </IonItem>
                            </IonItem>
                            <IonItem>
                                <label htmlFor="tollId">Cód. Praça</label>
                                <InputNumber inputId='tollId' value={tollId} onValueChange={(e) => setTollId(e.value)} useGrouping={false} required min={0} placeholder="Digite o código da praça"></InputNumber>
                            </IonItem>
                            <IonItem>
                                <label htmlFor="tollName">Nome Praça</label>
                                <InputText id='tollName' value={tollName} onChange={(e) => setTollName(e.target.value)} keyfilter={/^[^<>*!@#$%¨()_+{};:"']+$/} required placeholder="Digite o nome da praça"></InputText>
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