import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
        (document.getElementById('reindeer') as HTMLInputElement).value = response.reindeer;
        (document.getElementById('model') as HTMLInputElement).value = response.model;
        (document.getElementById('year') as HTMLInputElement).value = response.year;
        (document.getElementById('kilometer') as HTMLInputElement).value = response.kilometer;
        (document.getElementById('registration_date') as HTMLInputElement).value = response.registration_date;
        (document.getElementById('status') as HTMLInputElement).value = response.status;
      }else{

      }
    })
  }
}

function createCar(){
  car.setReindeer((document.getElementById('reindeer') as HTMLInputElement).value);
  car.setPlate((document.getElementById('plate') as HTMLInputElement).value);
  car.setModel((document.getElementById('model') as HTMLInputElement).value);
  car.setYear(parseInt((document.getElementById('year') as HTMLInputElement).value));
  car.setKilometer(parseInt((document.getElementById('kilometer') as HTMLInputElement).value));
  car.setRegistrationDate((document.getElementById('registration_date') as HTMLInputElement).value);
  car.setStatus((document.getElementById('status') as HTMLInputElement).value);
  carController.createCar(car).then(function(response){
    (document.getElementById('carId') as HTMLInputElement).value = response.carId;
    })
}

function updateCar(){
  car.setCarId(parseInt((document.getElementById('carId') as HTMLInputElement).value));
  car.setReindeer((document.getElementById('reindeer') as HTMLInputElement).value);
  car.setPlate((document.getElementById('plate') as HTMLInputElement).value);
  car.setModel((document.getElementById('model') as HTMLInputElement).value);
  car.setYear(parseInt((document.getElementById('year') as HTMLInputElement).value));
  car.setKilometer(parseInt((document.getElementById('kilometer') as HTMLInputElement).value));
  car.setRegistrationDate((document.getElementById('registration_date') as HTMLInputElement).value);
  car.setStatus((document.getElementById('status') as HTMLInputElement).value);
  carController.updateCar(car);
}

function deleteCar(){
  car.setCarId(parseInt((document.getElementById('carId') as HTMLInputElement).value));
  carController.deleteCar(car).then(function(){
    clearInputs();
  })
}

function clearInputs(){
  (document.getElementById('carId') as HTMLInputElement).value = '';
  (document.getElementById('reindeer') as HTMLInputElement).value = '';
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
            <IonItem>
              <IonInput label="Id Carro" id='carId' disabled labelPlacement='stacked'></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='renavam' id='reindeer' labelPlacement='stacked' required placeholder="Digite o renavam do carro"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='placa' id='plate' labelPlacement='stacked' required placeholder="Digite a placa do carro"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='modelo' id='model' labelPlacement='stacked' required placeholder="Digite o modelo do carro"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='ano' id='year' labelPlacement='stacked' required placeholder="Digite o ano do carro"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='Quilometragem' id='kilometer' labelPlacement='stacked' required placeholder="Digite a quilometragem do carro"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='Data de registro' id='registration_date' labelPlacement='stacked' required type='date'></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label='Status' id='status' labelPlacement='stacked' required placeholder="Digite o status do carro"></IonInput>
            </IonItem>
          </div>
          <div className='buttons'>
            <IonButton size='default' onClick={findCar}>Procurar</IonButton>
            <IonButton size='default' onClick={createCar}>Cadastrar</IonButton>
            <IonButton size='default' onClick={updateCar}>Atualizar</IonButton>
            <IonButton size='default' onClick={deleteCar}>Apagar</IonButton>
            <IonButton size='default' onClick={clearInputs}>Apagar inputs</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
