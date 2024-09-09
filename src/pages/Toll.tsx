import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
import './Toll.css'
import { ConcessionaireController } from "../controllers/ConcessionaireController";
import { Toll } from "../models/Toll";
import { TollController } from "../controllers/TollController";

var concessionaireController = new ConcessionaireController();
var tollController = new TollController();
var toll = new Toll();

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

function findToll(){
    let tollId = (document.getElementById('tollId') as HTMLInputElement).value;
    if(tollId != ''){
        tollController.findToll(parseInt(tollId)).then(function(response){
            if(response.id !== undefined){
                (document.getElementById('id') as HTMLInputElement).value = response.id;
                (document.getElementById('tollName') as HTMLInputElement).value = response.tollName;
                (document.getElementById('price') as HTMLInputElement).value = response.price;
                (document.getElementById('emptyCharge') as HTMLIonToggleElement).checked = response.emptyCharge;
                let concessionaireSelector = (document.getElementById('concessionaire') as HTMLIonSelectElement);
                let concessionaire = document.createElement('ion-select-option');
                concessionaire.innerHTML = response.concessionaire.concessionaireId + ' | ' + response.concessionaire.concessionaireName;
                concessionaire.value = response.concessionaire.id;
                concessionaireSelector.replaceChildren(concessionaire);
                concessionaireSelector.value = response.concessionaire.id;
                console.log(response.concessionaire);
            }else{
                alert('Praça de código ' + tollId + ' não encontrada!');
            }
        })
    }else{
        alert('Necessário fornecer um código parra realizar a pesquisa!');
    }
}

function createToll(){
    toll.setConcessionaire(parseInt((document.getElementById('concessionaire') as HTMLIonSelectElement).value));
    toll.setEmptyCharge((document.getElementById('emptyCharge') as HTMLIonToggleElement).checked);
    toll.setPrice(parseFloat((document.getElementById('price') as HTMLInputElement).value));
    toll.setTollId(parseInt((document.getElementById('tollId') as HTMLInputElement).value));
    toll.setTollName((document.getElementById('tollName') as HTMLInputElement).value);
    tollController.findToll(toll.getTollId()).then(function(response){
        if(response.id === undefined){
            tollController.createToll(toll).then(function(response){
                (document.getElementById('id') as HTMLInputElement).value = response.id;
                alert(response.tollName + ' com código ' + response.tollId + ' cadastrada com sucesso!');
            }).catch(error => alert('Necessário estar com todos os campos preenchidos para realizar o cadastro da praça!'));
        }else{
            alert('Praça de código ' + response.id + ' já se encontra cadastrada!');
        }
    })
}

function updateToll(){
    toll.setId(parseInt((document.getElementById('id') as HTMLInputElement).value));
    toll.setConcessionaire(parseInt((document.getElementById('concessionaire') as HTMLIonSelectElement).value));
    toll.setEmptyCharge((document.getElementById('emptyCharge') as HTMLIonToggleElement).checked);
    toll.setPrice(parseFloat((document.getElementById('price') as HTMLInputElement).value));
    toll.setTollId(parseInt((document.getElementById('tollId') as HTMLInputElement).value));
    toll.setTollName((document.getElementById('tollName') as HTMLInputElement).value);
    tollController.updateToll(toll).then(function(response){
        alert('Praça de nome ' + response.tollName + ' com código ' + response.tollId + ' atualizada com sucesso!');
    }).catch(error => alert('Necessáiro estar com todos os campos preenchidos para realizar a atualização!'));
}

function deleteToll(){
    let tollId = parseInt((document.getElementById('tollId') as HTMLInputElement).value);
    tollController.findToll(tollId).then(function(response){
        let tollName = response.tollName;
        if(response.id !== undefined){
            toll.setId(response.id);
            tollController.deleteToll(toll).then(function(){
                clearInputs();
                alert('Praça de nome ' + tollName + ' com código ' + tollId + ' excluida com sucesso!');
            })
        }else{
            alert('A praça com código ' + tollId + ' não pode ser encontrada!');
        }
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
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Praças</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="toll">
                    <div>
                        <h1>Cadastro de praças</h1>
                        <IonItem>
                            <IonInput label="Id praça" id="id" disabled labelPlacement="floating"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel id="label">
                                <IonSelect label="Concessionária" id="concessionaire" placeholder="Selecione a concessionária" onClick={findConcessionaires}></IonSelect>
                                <a href="/concessionaire">Adicionar nova concessionária?</a>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Cód. Praça" id="tollId" labelPlacement="floating" placeholder="Digite o código da praça" type="number"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Nome Praça" id="tollName" labelPlacement="floating" placeholder="Digite o nome da praça"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Preço" id="price" labelPlacement="floating" placeholder="Digite o valor da praça" type="number"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonToggle id="emptyCharge">Cobra Vazio</IonToggle>
                        </IonItem>
                    </div>
                    <br />
                    <div className="buttons">
                        <IonButton size="default" onClick={findToll}>Procurar</IonButton>
                        <IonButton size="default" onClick={createToll}>Cadastrar</IonButton>
                        <IonButton size="default" onClick={updateToll}>Atualizar</IonButton>
                        <IonButton size="default" onClick={deleteToll}>Apagar</IonButton>
                        <IonButton size="default" onClick={clearInputs}>Apagar entradas</IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default TollPage;