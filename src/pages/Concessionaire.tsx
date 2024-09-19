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
        if(response.data.length > 0){
            for (let i = 0; i < response.data.length; i++) {
                let concessionaireId = document.createElement('ion-label');
                let concessionaireName = document.createElement('ion-label');
                concessionaireId.innerHTML = response.data[i].concessionaireId;
                concessionaireId.setAttribute('id',response.data[i].concessionaireId);
                concessionaireName.innerHTML = response.data[i].concessionaireName;
                concessionaireName.setAttribute('id',response.data[i].concessionaireName);
                let editIcon = document.createElement('ion-icon');
                let editButton = document.createElement('ion-button');
                editIcon.setAttribute('icon',pencil);
                editButton.setAttribute('id',response.data[i].concessionaireId);
                editButton.appendChild(editIcon);
                editButton.addEventListener('click',findConcessionaire);
                let deleteIcon = document.createElement('ion-icon');
                let deleteButton = document.createElement('ion-button');
                deleteIcon.setAttribute('icon',trashCan);
                deleteButton.setAttribute('id',response.data[i].concessionaireId);
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
        (document.getElementById('id') as HTMLInputElement).value = response.data.id;
        (document.getElementById('concessionaireId') as HTMLInputElement).value = response.data.concessionaireId;
        (document.getElementById('concessionaireName') as HTMLInputElement).value = response.data.concessionaireName;
    });
}

function saveConcessionaire(){
    let id = (document.getElementById('id') as HTMLInputElement).value;
    concessionaire.setConcessionaireId(parseInt((document.getElementById('concessionaireId') as HTMLInputElement).value));
    concessionaire.setConcessionaireName((document.getElementById('concessionaireName') as HTMLInputElement).value);
    if(id == ''){
        concessionaireController.createConcessionaire(concessionaire).then(function(response){
            if(response.status == 200){
                (document.getElementById('id') as HTMLInputElement).value = response.data.id;
                clearInputs();
                findAllConcessionaires();
                alert('Concessionária com código ' + response.data.concessionaireId + ' adicionada com sucesso!');
            }else if(response.status == 422){
                alert("Código da Concessionária duplicado!");
            }else{
                alert("Erro inesperado!");
            }
        });
    }else{
        concessionaire.setId(parseInt(id));
        concessionaireController.updateConcessionaire(concessionaire).then(function(response){
            if(response.status == 200){
                clearInputs();
                findAllConcessionaires();
                alert('Concessionária de código ' + response.data.concessionaireId + ' atualizada com sucesso!');
            }else if(response.status == 422){
                alert("Código da Concessionária duplicado!");
            }else{
                alert("Erro inesperado!");
            }
        });
    }
}

function deleteConcessionaire(value:any){
    let concessionaireId = value.target.id;
    concessionaireController.findConcessionaire(concessionaireId).then(function(response){
        concessionaire.setId(response.data.id);
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
                        <IonBackButton defaultHref='/car'></IonBackButton>
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
                                <InputText id='concessionaireName' value={concessionaireName} onChange={(e) => setConcessionaireName(e.target.value)} keyfilter={/^[^<>*!@#$%¨()_+{};:"']+$/} required placeholder="Digite o nome da concessionária"></InputText>
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