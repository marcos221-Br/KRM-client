import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import './Concessionaire.css'
import { ConcessionaireController } from "../controllers/ConcessionaireController";
import { Concessionaire } from "../models/Concessionaire";

var concessionaireController = new ConcessionaireController();
var concessionaire = new Concessionaire();

function findConcessionaire(){
    let concessionaireId = (document.getElementById('concessionaireId') as HTMLInputElement).value;
    if(concessionaireId != ''){
        concessionaireController.findConcessionaire(parseInt(concessionaireId)).then(function(response){
            if(response.id !== undefined){
                (document.getElementById('id') as HTMLInputElement).value = response.id;
                (document.getElementById('concessionaireId') as HTMLInputElement).value = response.concessionaireId;
                (document.getElementById('concessionaireName') as HTMLInputElement).value = response.concessionaireName;
            }else{
                alert('Concessionária com código ' + concessionaireId + ' não encontrada!');
            }
        })
    }else{
        alert('Necessário fornecer um código de concessionária para realizar a busca!');
    }
}

function createConcessionaire(){
    concessionaire.setConcessionaireId(parseInt((document.getElementById('concessionaireId') as HTMLInputElement).value));
    concessionaire.setConcessionaireName((document.getElementById('concessionaireName') as HTMLInputElement).value);
    concessionaireController.findConcessionaire(concessionaire.getConcessionaireId()).then(function(response){
        if(response.id === undefined){
            concessionaireController.createConcessionaire(concessionaire).then(function(response){
                (document.getElementById('id') as HTMLInputElement).value = response.id;
                alert('Concessionária com código ' + response.concessionaireId + ' adicionada com sucesso!');
            }).catch(error => alert('Necessário preencher todos os campos para realizar o cadastro!'));
        }else{
            alert('A concecionária com código ' + concessionaire.getConcessionaireId + ' já se encontra cadastrada!');
        }
    })
}

function updateConcessionaire(){
    concessionaire.setId(parseInt((document.getElementById('id') as HTMLInputElement).value));
    concessionaire.setConcessionaireId(parseInt((document.getElementById('concessionaireId') as HTMLInputElement).value));
    concessionaire.setConcessionaireName((document.getElementById('concessionaireName') as HTMLInputElement).value);
    concessionaireController.updateConcessionaire(concessionaire).then(function(response){
        alert('Concessionária de código ' + response.concessionaireId + ' atualizada com sucesso!');
    }).catch(error => alert('Necessário estar com todos os campos preenchidos para realizar a atualização!'));
}

function deleteConcessionaire(){
    let concessionaireId = parseInt((document.getElementById('concessionaireId') as HTMLInputElement).value);
    concessionaireController.findConcessionaire(concessionaireId).then(function(response){
        if(response.id !== undefined){
            concessionaire.setId(response.id);
            concessionaireController.deleteConcessionaire(concessionaire).then(function(){
                clearInputs();
                alert('Concessionária ' + concessionaireId + ' excluida com sucesso!');
            })
        }else{
            alert('A concessionária com código ' + concessionaireId + ' não foi encontrada no banco!');
        }
    })
}

function clearInputs(){
    (document.getElementById('id') as HTMLInputElement).value = '';
    (document.getElementById('concessionaireId') as HTMLInputElement).value = '';
    (document.getElementById('concessionaireName') as HTMLInputElement).value = '';
}

const ConcessionairePage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Concessionárias</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="concessionaire">
                    <div>
                        <h1>Cadastro de concessionárias</h1>
                        <IonItem>
                            <IonInput label="Id Concesionária" id="id" disabled labelPlacement="floating"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label='Cód. Concessionária' id='concessionaireId' labelPlacement='floating' placeholder="Digite o código da concessionária" type="number"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Nome Concessionária" id="concessionaireName" labelPlacement="floating" placeholder="Digite o nome da conessionária"></IonInput>
                        </IonItem>
                    </div>
                    <br />
                    <div className='buttons'>
                        <IonButton size='default' onClick={findConcessionaire}>Procurar</IonButton>
                        <IonButton size='default' onClick={createConcessionaire}>Cadastrar</IonButton>
                        <IonButton size='default' onClick={updateConcessionaire}>Atualizar</IonButton>
                        <IonButton size='default' onClick={deleteConcessionaire}>Apagar</IonButton>
                        <IonButton size='default' onClick={clearInputs}>Apagar entradas</IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ConcessionairePage;