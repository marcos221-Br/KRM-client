import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar, useIonAlert, useIonToast } from '@ionic/react';
import './Home.css';
import { CarController } from '../controllers/CarController';
import { Car } from '../models/Car';

var carController = new CarController();
var car = new Car();

function findCar(){
  let plate = (document.getElementById('plate') as HTMLInputElement).value;
  if(plate != ''){
    carController.findCar(plate).then(function(response){
      if(response.carId !== undefined){
        (document.getElementById('carId') as HTMLInputElement).value = response.carId;
        (document.getElementById('renavam') as HTMLInputElement).value = response.renavam;
        (document.getElementById('model') as HTMLInputElement).value = response.model;
        (document.getElementById('year') as HTMLInputElement).value = response.year;
        (document.getElementById('kilometer') as HTMLInputElement).value = response.kilometer;
        (document.getElementById('registration_date') as HTMLInputElement).value = response.registration_date;
        (document.getElementById('status') as HTMLInputElement).value = response.status;
      }else{
        alert('Carro com placa ' + plate + ' não encontrado!');
      }
    })
  }else{
    alert('Necessário fornecer uma placa para realizar a procura!');
  }
}

function createCar(){
  car.setRenavam((document.getElementById('renavam') as HTMLInputElement).value);
  car.setPlate((document.getElementById('plate') as HTMLInputElement).value);
  car.setModel((document.getElementById('model') as HTMLInputElement).value);
  car.setYear(parseInt((document.getElementById('year') as HTMLInputElement).value));
  car.setKilometer(parseInt((document.getElementById('kilometer') as HTMLInputElement).value));
  car.setRegistrationDate((document.getElementById('registration_date') as HTMLInputElement).value);
  car.setStatus((document.getElementById('status') as HTMLInputElement).value);
  carController.findCar(car.getPlate()).then(function(response){
    if(response.carId === undefined){
      carController.createCar(car).then(function(response){
        (document.getElementById('carId') as HTMLInputElement).value = response.carId;
        alert(response.model + ' com placa ' + response.plate + ' cadastrado com sucesso!');
      }).catch(error => alert('Necessário preencher todos os campos para realizar o cadastro!'));
    }else{
      alert('Carro com placa' + car.getPlate() + ' cadastrado anteriormente!');
    }
  })
}

function updateCar(){
  car.setCarId(parseInt((document.getElementById('carId') as HTMLInputElement).value));
  car.setRenavam((document.getElementById('renavam') as HTMLInputElement).value);
  car.setPlate((document.getElementById('plate') as HTMLInputElement).value);
  car.setModel((document.getElementById('model') as HTMLInputElement).value);
  car.setYear(parseInt((document.getElementById('year') as HTMLInputElement).value));
  car.setKilometer(parseInt((document.getElementById('kilometer') as HTMLInputElement).value));
  car.setRegistrationDate((document.getElementById('registration_date') as HTMLInputElement).value);
  car.setStatus((document.getElementById('status') as HTMLInputElement).value);
  carController.updateCar(car).then(function(response){
    alert(response.model + ' com placa ' + response.plate + ' foi atualizado com sucesso!');
  }).catch(error => alert('Necessário estar com todos os campos preenchidos para realizar a atualização!'));
}

function deleteCar(){
  let plate = (document.getElementById('plate') as HTMLInputElement).value;
  carController.findCar(plate).then(function(response){
    let model = response.model;
    if(response.carId !== undefined){
      car.setCarId(response.carId);
      carController.deleteCar(car).then(function(){
        clearInputs();
        alert(model + ' com placa ' + plate + ' excluido com sucesso!');
      })
    }else{
      alert('O carro com placa ' + plate + ' não foi encontrado no banco!');
    }
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

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Carros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='car'>
          <div>
            <h1>Cadastro de carros</h1>
            <IonItem>
              <IonInput label="Id Carro" id='carId' disabled labelPlacement='floating'></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='Renavam' id='renavam' labelPlacement='floating' placeholder="Digite o renavam do carro"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='Placa' id='plate' labelPlacement='floating' placeholder="Digite a placa do carro"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='Modelo' id='model' labelPlacement='floating' placeholder="Digite o modelo do carro"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='Ano' id='year' labelPlacement='floating' placeholder="Digite o ano do carro" type='number'></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='Quilometragem' id='kilometer' labelPlacement='floating' placeholder="Digite a quilometragem do carro" type='number'></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='Data de registro' id='registration_date' labelPlacement='floating' type='date'></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='Status' id='status' labelPlacement='floating' placeholder="Digite o status do carro"></IonInput>
            </IonItem>
          </div>
          <br />
          <div className='buttons'>
            <IonButton size='default' onClick={findCar}>Procurar</IonButton>
            <IonButton size='default' onClick={createCar}>Cadastrar</IonButton>
            <IonButton size='default' onClick={updateCar}>Atualizar</IonButton>
            <IonButton size='default' onClick={deleteCar}>Apagar</IonButton>
            <IonButton size='default' onClick={clearInputs}>Apagar entradas</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
