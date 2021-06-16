import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {coordinarUsuario} from '../src/app/reducers/userReducer'
import LoadingOverlay from 'react-loading-overlay';

import Swal from "sweetalert2";


// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Cargando...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

/**
 * 
 * @returns 
 * La forma en que funciona es la siguiente. 
 * 
 *  1. Ingresa un usuario a través de keycloak
 *  2. Ante cada evento que se produce en el keycloak, la función eventLogger se encarga de manejarlo
 *  3. En el estado onAuthSuccess de keycloak se realizan distintas funcionalidades
 *    3.1. Se trata de coordinar el usuario de keycloak con el usuario del MS portal
 *    3.2. Si no existe ningún problema se habilita el acceso al Portal
 *    3.3. Si existe algún error en la llamada al método coordinar, se le dispara un mensaje y luego desloguea al usuario. 
 * 
 */

export const App = () => {

  const dispatch = useDispatch();

  const [cargando, setCargando] = useState(true)

  const [error, setError] = useState(false)




  const eventLogger = (event, error) => {
    if (typeof error !== undefined) {
      switch (event) {
        case 'onAuthSuccess':
          dispatch(coordinarUsuario())
          .then(() => {
             setCargando(false);
             setError(false)
           }  
          )
          .catch(e => {
            setError(true)
            Swal.fire("Ud no tiene permisos para ingresar al Portal", "error").then(e =>keycloak.logout()
              )
            
           }
          );
          break;
        case 'onAuthLogout':
          break;
        default:
          break;
      }
    }
  }


  
  let initOptions = {
   
     onLoad: 'login-required',
     checkLoginIframe : false,
  }
    

  
    return (
      
        <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={initOptions}
        onEvent={eventLogger}

        >
          <LoadingOverlay
            active={cargando && !keycloak.authenticated}
            spinner
            text='Cargando contenido...'
            >
            
            <HashRouter>
                <React.Suspense fallback={loading()}>
                  <Switch>
                    {!error ? 
                      <Route path="/" name="Inicio" render={props => <DefaultLayout {...props}/>} />
                      : <Route path="/" name="Error"  />
                    }
                  </Switch>
                </React.Suspense>
            </HashRouter> 
            </LoadingOverlay> 
        </ReactKeycloakProvider>    
      
    );
  
}

export default App;
