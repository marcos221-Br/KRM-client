import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"

const HomePage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="home">
                    <a href='/car'>CRUD Carros</a>
                    <br />
                    <a href='/concessionaire'>CRUD Concessionárias</a>
                    <br />
                    <a href='/toll'>CRUD Praças</a>
                    <br />
                    <a href='/country'>CRUD Países</a>
                    <br />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default HomePage;