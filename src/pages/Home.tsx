import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { Link } from "react-router-dom";

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
                    <Link to='/car'>CRUD Carros</Link>
                    <Link to='/concessionaire'>CRUD Concessionárias</Link>
                    <Link to='/toll'>CRUD Praças</Link>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default HomePage;