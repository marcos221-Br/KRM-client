import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import './Concessionaire.css'
import { ConcessionaireController } from "../controllers/ConcessionaireController";
import { Concessionaire } from "../models/Concessionaire";
import pencil from '../images/pencil-line.svg';
import trashCan from '../images/delete-bin-5-line.svg';
import { useForm } from "react-hook-form";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { InputText } from "primereact/inputtext";

var concessionaireController = new ConcessionaireController();
var concessionaire = new Concessionaire();

function findAllConcessionaires(){
    concessionaireController.findAllConcessionaires().then(function(response){
        let list = (document.getElementById('concessionaireList') as HTMLIonListElement);
        if(response.length > 0){
            for (let i = 0; i < response.length; i++) {
                let concessionaireId = document.createElement('ion-label');
                let concessionaireName = document.createElement('ion-label');
                concessionaireId.innerHTML = response[i].concessionaireId;
                concessionaireId.setAttribute('id',response[i].concessionaireId);
                concessionaireName.innerHTML = response[i].concessionaireName;
                concessionaireName.setAttribute('id',response[i].concessionaireName);
                let editIcon = document.createElement('ion-icon');
                let editButton = document.createElement('ion-button');
                editIcon.setAttribute('icon',pencil);
                editButton.setAttribute('id',response[i].concessionaireId);
                editButton.appendChild(editIcon);
                editButton.addEventListener('click',findConcessionaire);
                let deleteIcon = document.createElement('ion-icon');
                let deleteButton = document.createElement('ion-button');
                deleteIcon.setAttribute('icon',trashCan);
                deleteButton.setAttribute('id',response[i].concessionaireId);
                deleteButton.appendChild(deleteIcon);
                deleteButton.addEventListener('click',deleteConcessionaire);
                let ionItem = document.createElement('ion-item');
                ionItem.appendChild(concessionaireId);
                ionItem.appendChild(concessionaireName);
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

function findConcessionaire(value:any){
    concessionaireController.findConcessionaire(parseInt(value.target.id)).then(function(response){
        (document.getElementById('id') as HTMLInputElement).value = response.id;
        (document.getElementById('concessionaireId') as HTMLInputElement).value = response.concessionaireId;
        (document.getElementById('concessionaireName') as HTMLInputElement).value = response.concessionaireName;
    });
}

function saveConcessionaire(){
    let id = (document.getElementById('id') as HTMLInputElement).value;
    concessionaire.setConcessionaireId(parseInt((document.getElementById('concessionaireId') as HTMLInputElement).value));
    concessionaire.setConcessionaireName((document.getElementById('concessionaireName') as HTMLInputElement).value);
    if(id == ''){
        concessionaireController.findConcessionaire(concessionaire.getConcessionaireId()).then(function(response){
            if(response.id === undefined){
                concessionaireController.createConcessionaire(concessionaire).then(function(response){
                    (document.getElementById('id') as HTMLInputElement).value = response.id;
                    clearInputs();
                    findAllConcessionaires();
                    alert('Concessionária com código ' + response.concessionaireId + ' adicionada com sucesso!');
                }).catch(error => alert('Sem acesso ao sistema'));
            }else{
                alert('A concecionária com código ' + concessionaire.getConcessionaireId() + ' já se encontra cadastrada!');
            }
        })
    }else{
        concessionaire.setId(parseInt(id));
        concessionaireController.updateConcessionaire(concessionaire).then(function(response){
            clearInputs();
            findAllConcessionaires();
            alert('Concessionária de código ' + response.concessionaireId + ' atualizada com sucesso!');
        }).catch(error => alert('Sem acesso ao sistema'));
    }
}

function deleteConcessionaire(value:any){
    let concessionaireId = value.target.id;
    concessionaireController.findConcessionaire(concessionaireId).then(function(response){
        concessionaire.setId(response.id);
        concessionaireController.deleteConcessionaire(concessionaire).then(function(){
            clearInputs();
            findAllConcessionaires();
            alert('Concessionária ' + concessionaireId + ' excluida com sucesso!');
        })
    })
}

function clearInputs(){
    (document.getElementById('id') as HTMLInputElement).value = '';
    (document.getElementById('concessionaireId') as HTMLInputElement).value = '';
    (document.getElementById('concessionaireName') as HTMLInputElement).value = '';
}

const ConcessionairePage: React.FC = () => {
    var { handleSubmit } = useForm();
    findAllConcessionaires();
    const [concessionaireId, setConcessionaireId] = useState<number>();
    const [concessionaireName, setConcessionaireName] = useState<string>();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Concessionárias</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="concessionaire">
                    <div>
                        <h1>Cadastro de concessionárias</h1>
                        <form onSubmit={handleSubmit(saveConcessionaire)}>
                            <IonItem>
                                <IonInput label="Id Concesionária" id="id" disabled></IonInput>
                            </IonItem>
                            <IonItem>
                                <label htmlFor="concessionaireId">Cód. Concessionária</label>
                                <InputNumber inputId='concessionaireId' value={concessionaireId} onValueChange={(e) => setConcessionaireId(e.value)} useGrouping={false} required min={0} placeholder="Digite o código da concessionária"></InputNumber>
                            </IonItem>
                            <IonItem>
                                <label htmlFor="concessionaireName">Nome Concessionária</label>
                                <InputText id='concessionaireName' value={concessionaireName} onChange={(e) => setConcessionaireName(e.target.value)} keyfilter='alphanum' required placeholder="Digite o nome da concessionária"></InputText>
                            </IonItem>
                            <br />
                            <div className='buttons'>
                                <IonButton size='default' type="submit">Salvar</IonButton>
                            </div>
                        </form>
                    </div>
                    <br />
                    <IonList id='concessionaireList'></IonList>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ConcessionairePage;