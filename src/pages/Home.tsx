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
                    <a href="/car">CRUD Carros</a>
                    <br />
                    <a href="/concessionaire">CRUD Concessionárias</a>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default HomePage;