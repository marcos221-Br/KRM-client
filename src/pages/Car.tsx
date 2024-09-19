import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import './Car.css';
import { CarController } from '../controllers/CarController';
import { Car } from '../models/Car';
import pencil from '../images/pencil-line.svg';
import trashCan from '../images/delete-bin-5-line.svg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

var carController = new CarController();
var car = new Car();

function findCar(value:any){
  carController.findCar(value.target.id).then(function(response){
    (document.getElementById('id') as HTMLInputElement).value = response.data.id;
    (document.getElementById('renavam') as HTMLInputElement).value = response.data.renavam;
    (document.getElementById('model') as HTMLInputElement).value = response.data.model;
    (document.getElementById('year') as HTMLInputElement).value = response.data.year;
    (document.getElementById('kilometer') as HTMLInputElement).value = response.data.kilometer + ' km';
    (document.getElementById('registration_date') as HTMLInputElement).value = response.data.registrationDate;
    (document.getElementById('status') as HTMLInputElement).value = response.data.status;
    (document.getElementById('plate') as HTMLInputElement).value = response.data.plate;
  })
}

function findAllCars(){
  carController.findAllCars().then(function(response){
    let list = (document.getElementById('carList') as HTMLIonListElement);
    if(response.data.length > 0){
      for(let i = 0; i < response.data.length; i++){
        let renavam = document.createElement('ion-label');
        let plate = document.createElement('ion-label');
        let model = document.createElement('ion-label');
        let status = document.createElement('ion-label');
        renavam.innerHTML = response.data[i].renavam;
        plate.innerHTML = response.data[i].plate;
        plate.setAttribute('id',response.data[i].plate);
        model.innerHTML = response.data[i].model;
        model.setAttribute('id',response.data[i].model);
        status.innerHTML = response.data[i].status == 'Active' ? 'Ativo':'Inativo';
        let editIcon = document.createElement('ion-icon');
        let editButton = document.createElement('ion-button');
        editIcon.setAttribute('icon',pencil);
        editButton.setAttribute('id',response.data[i].plate);
        editButton.appendChild(editIcon);
        editButton.addEventListener('click',findCar);
        let deleteIcon = document.createElement('ion-icon');
        let deleteButton = document.createElement('ion-button');
        deleteIcon.setAttribute('icon',trashCan);
        deleteButton.setAttribute('id',response.data[i].id);
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
  let id = (document.getElementById('id') as HTMLInputElement).value;
  car.setRenavam((document.getElementById('renavam') as HTMLInputElement).value);
  car.setPlate((document.getElementById('plate') as HTMLInputElement).value);
  car.setModel((document.getElementById('model') as HTMLInputElement).value);
  car.setYear(parseInt((document.getElementById('year') as HTMLInputElement).value));
  car.setKilometer(parseInt((document.getElementById('kilometer') as HTMLInputElement).value));
  car.setRegistrationDate((document.getElementById('registration_date') as HTMLInputElement).value);
  car.setStatus((document.getElementById('status') as HTMLInputElement).value);
  if(id == ''){
    carController.createCar(car).then(function(response){
      if(response.status == 200){
        clearInputs();
        findAllCars();
        alert(response.data.model + ' com placa ' + response.data.plate + ' cadastrado com sucesso!');
      }else if(response.status == 422){
        carController.findCar(car.getPlate()).then(function(response){
          if(response.status == 200){
            alert("Placa duplicada!");
          }else{
            alert("Renavam duplicado!");
          }
        })
      }else{
        alert('Erro inesperado!');
      }
    });
  }else{
    car.setId(parseInt(id));
    carController.updateCar(car).then(function(response){
      if(response.status == 200){
        clearInputs();
        findAllCars();
        alert(response.data.model + ' com placa ' + response.data.plate + ' foi atualizado com sucesso!');
      }else if(response.status == 422){
        carController.findCar(car.getPlate()).then(function(response){
          if(response.status == 200 && response.data.plate != car.getPlate()){
            alert("Placa duplicada!");
          }else{
            alert("Renavam duplicado!");
          }
        });
      }else{
        alert('Erro inesperado!');
      }
    });
  }
}

function deleteCar(value:any){
  let plate = value.target.parentElement.children[1].id;
  let model = value.target.parentElement.children[2].id;
  car.setId(value.target.id);
  carController.deleteCar(car).then(function(){
    clearInputs();
    alert(model + ' com placa ' + plate + ' excluido com sucesso!');
    findAllCars();
  })
}

function clearInputs(){
  (document.getElementById('id') as HTMLInputElement).value = '';
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
  const [plate, setPlate] = useState<string>();
  const [model, setModel] = useState<string>();
  const [year, setYear] = useState<string>();
  const [kilometer, setKilometer] = useState<number>();
  const [renavam, setRenavam] = useState<string>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/car'></IonBackButton>
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
                <IonInput label="Id Carro" id='id' disabled></IonInput>
              </IonItem>
              <IonItem>
                <label htmlFor="renavam">Renavam</label>
                <InputMask id='renavam' mask='***********' value={renavam} onChange={(e) => setRenavam(e.target.value)} required placeholder="Digite o renavam do carro"></InputMask>
              </IonItem>
              <IonItem>
                <label htmlFor="plate">Placa</label>
                <InputMask id='plate' mask='aaa9*99' value={plate} onChange={(e) => setPlate(e.target.value)} required placeholder="Digite a placa do carro"></InputMask>
              </IonItem>
              <IonItem>
                <label htmlFor="model">Modelo</label>
                <InputText id='model' value={model} onChange={(e) => setModel(e.target.value)} keyfilter={/^[^<>*!@#$%¨()_+{};:"']+$/} required placeholder="Digite o modelo do carro"></InputText>
              </IonItem>
              <IonItem>
                <label htmlFor="year">Ano</label>
                <InputMask id='year' value={year} onChange={(e) => setYear(e.target.value)} required mask='9999' placeholder="Digite o ano do carro"></InputMask>
              </IonItem>
              <IonItem>
                <label htmlFor="kilometer">Quilometragem</label>
                <InputNumber inputId='kilometer' value={kilometer} onValueChange={(e) => setKilometer(e.value)} suffix=' km' required min={0} placeholder="Digite a quilometragem do carro" useGrouping={false}></InputNumber>
              </IonItem>
              <IonItem>
                <IonInput label='Data de registro' id='registration_date' type='date' required></IonInput>
              </IonItem>
              <IonItem>
                <IonSelect label='Status' id='status' placeholder="Selecione o status do carro" interface='popover'>
                  <IonSelectOption value={'Active'}>Ativo</IonSelectOption>
                  <IonSelectOption value={'Disable'}>Inativo</IonSelectOption>
                </IonSelect>
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
