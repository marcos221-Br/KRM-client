import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Car.css';
import { CarController } from '../controllers/CarController';
import { Car } from '../models/Car';
import pencil from '../images/pencil-line.svg';
import trashCan from '../images/delete-bin-5-line.svg';
import { useForm } from 'react-hook-form';

var carController = new CarController();
var car = new Car();

function findCar(value:any){
  carController.findCar(value.target.id).then(function(response){
    (document.getElementById('carId') as HTMLInputElement).value = response.carId;
    (document.getElementById('renavam') as HTMLInputElement).value = response.renavam;
    (document.getElementById('model') as HTMLInputElement).value = response.model;
    (document.getElementById('year') as HTMLInputElement).value = response.year;
    (document.getElementById('kilometer') as HTMLInputElement).value = response.kilometer;
    (document.getElementById('registration_date') as HTMLInputElement).value = response.registration_date;
    (document.getElementById('status') as HTMLInputElement).value = response.status;
    (document.getElementById('plate') as HTMLInputElement).value = response.plate;
  })
}

function findAllCars(){
  carController.findAllCars().then(function(response){
    let list = (document.getElementById('carList') as HTMLIonListElement);
    if(response.length > 0){
      for(let i = 0; i < response.length; i++){
        let renavam = document.createElement('ion-label');
        let plate = document.createElement('ion-label');
        let model = document.createElement('ion-label');
        let status = document.createElement('ion-label');
        renavam.innerHTML = response[i].renavam;
        plate.innerHTML = response[i].plate;
        plate.setAttribute('id',response[i].plate);
        model.innerHTML = response[i].model;
        model.setAttribute('id',response[i].model);
        status.innerHTML = response[i].status;
        let editIcon = document.createElement('ion-icon');
        let editButton = document.createElement('ion-button');
        editIcon.setAttribute('icon',pencil);
        editButton.setAttribute('id',response[i].plate);
        editButton.appendChild(editIcon);
        editButton.addEventListener('click',findCar);
        let deleteIcon = document.createElement('ion-icon');
        let deleteButton = document.createElement('ion-button');
        deleteIcon.setAttribute('icon',trashCan);
        deleteButton.setAttribute('id',response[i].carId);
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener('click',deleteCar);
        let ionItem = document.createElement('ion-item');
        ionItem.appendChild(renavam);
        ionItem.appendChild(plate);
        ionItem.appendChild(model);
        ionItem.appendChild(status);
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

function saveCar(){
  let id = (document.getElementById('carId') as HTMLInputElement).value;
  car.setRenavam((document.getElementById('renavam') as HTMLInputElement).value);
  car.setPlate((document.getElementById('plate') as HTMLInputElement).value);
  car.setModel((document.getElementById('model') as HTMLInputElement).value);
  car.setYear(parseInt((document.getElementById('year') as HTMLInputElement).value));
  car.setKilometer(parseInt((document.getElementById('kilometer') as HTMLInputElement).value));
  car.setRegistrationDate((document.getElementById('registration_date') as HTMLInputElement).value);
  car.setStatus((document.getElementById('status') as HTMLInputElement).value);
  if(id == ''){
    carController.findCar(car.getPlate()).then(function(response){
      if(response.carId === undefined){
        carController.createCar(car).then(function(response){
          (document.getElementById('carId') as HTMLInputElement).value = response.carId;
          clearInputs();
          findAllCars();
          alert(response.model + ' com placa ' + response.plate + ' cadastrado com sucesso!');
        }).catch(error => alert('Sem acesso ao sistema'));
      }else{
        alert('Carro com placa' + car.getPlate() + ' cadastrado anteriormente!');
      }
    }).catch(error => alert('Necessário preencher todos os campos para cadastrar o carro!'))
  }else{
    car.setCarId(parseInt(id));
    carController.updateCar(car).then(function(response){
      clearInputs();
      findAllCars();
      alert(response.model + ' com placa ' + response.plate + ' foi atualizado com sucesso!');
    }).catch(error => alert('Sem acesso ao sistema'));
  }
}

function deleteCar(value:any){
  let plate = value.target.parentElement.children[1].id;
  let model = value.target.parentElement.children[2].id;
  car.setCarId(value.target.id);
  carController.deleteCar(car).then(function(){
    clearInputs();
    alert(model + ' com placa ' + plate + ' excluido com sucesso!');
    findAllCars();
  })
}

function clearInputs(){
  (document.getElementById('carId') as HTMLInputElement).value = '';
  (document.getElementById('renavam') as HTMLInputElement).value = '';
  (document.getElementById('plate') as HTMLInputElement).value = '';
  (document.getElementById('model') as HTMLInputElement).value = '';
  (document.getElementById('year') as HTMLInputElement).value = '';
  (document.getElementById('kilometer') as HTMLInputElement).value = '';
  (document.getElementById('registration_date') as HTMLInputElement).value = '';
  (document.getElementById('status') as HTMLInputElement).value = '';
}

const CarPage: React.FC = () => {
  var { handleSubmit} = useForm()
  findAllCars();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/'></IonBackButton>
          </IonButtons>
          <IonTitle>Carros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='car'>
          <div>
            <h1>Cadastro de carros</h1>
            <form onSubmit={handleSubmit(saveCar)}>
              <IonItem>
                <IonInput label="Id Carro" id='carId' disabled labelPlacement='floating'></IonInput>
              </IonItem>
              <IonItem>
                <IonInput label='Renavam' id='renavam' labelPlacement='floating' placeholder="Digite o renavam do carro" maxlength={11} required></IonInput>
              </IonItem>
              <IonItem>
                <IonInput label='Placa' id='plate' labelPlacement='floating' placeholder="Digite a placa do carro" required maxlength={8}></IonInput>
              </IonItem>
              <IonItem>
                <IonInput label='Modelo' id='model' labelPlacement='floating' placeholder="Digite o modelo do carro" required></IonInput>
              </IonItem>
              <IonItem>
                <IonInput label='Ano' id='year' labelPlacement='floating' placeholder="Digite o ano do carro" type='number' required min={0}></IonInput>
              </IonItem>
              <IonItem>
                <IonInput label='Quilometragem' id='kilometer' labelPlacement='floating' placeholder="Digite a quilometragem do carro" type='number' required min={0}></IonInput>
              </IonItem>
              <IonItem>
                <IonInput label='Data de registro' id='registration_date' labelPlacement='floating' type='date' required></IonInput>
              </IonItem>
              <IonItem>
                <IonInput label='Status' id='status' labelPlacement='floating' placeholder="Digite o status do carro" required></IonInput>
              </IonItem>
              <br />
              <div className='buttons'>
                <IonButton size='default' type="submit">Salvar</IonButton>
              </div>
            </form>
          </div>
          <br />
          <IonList id='carList'></IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CarPage;
