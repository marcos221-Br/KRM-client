import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import HomePage from './pages/Home';
import CarPage from './pages/Car';
import ConcessionairePage from './pages/Concessionaire';
import TollPage from './pages/Toll';
import CountryPage from './pages/Country';

import home from './images/Home--Streamline-Radix.svg';
import car from './images/car-outline.svg';
import concessionaire from './images/Office-Building-Double--Streamline-Ultimate.svg';
import toll from './images/Garage--Streamline-Sharp----Material-Symbols.svg';
import country from './images/Globe--Streamline-Mynaui.svg';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { HttpConection } from './components/Json';

function setup(){
  HttpConection.setHeader('Content-Type','application/json')
}

setupIonicReact();
setup();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path='/' to='/car'></Redirect>
          <Route exact path={"/car"} component={CarPage}/>
          <Route exact path="/concessionaire" component={ConcessionairePage} />
          <Route exact path="/toll" component={TollPage} />
          <Route exact path="/country" component={CountryPage} />
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab='car' href='/car'>
            <IonIcon aria-hidden="true" icon={car}/>
            <IonLabel>Carros</IonLabel>
          </IonTabButton>
          <IonTabButton tab='concessionaires' href='/concessionaire'>
            <IonIcon aria-hidden="true" icon={concessionaire}/>
            <IonLabel>Concessionárias</IonLabel>
          </IonTabButton>
          <IonTabButton tab='tolls' href='/toll'>
            <IonIcon aria-hidden="true" icon={toll}/>
            <IonLabel>Praças</IonLabel>
          </IonTabButton>
          <IonTabButton tab='countries' href='/country'>
            <IonIcon aria-hidden="true" icon={country}/>
            <IonLabel>Países</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
