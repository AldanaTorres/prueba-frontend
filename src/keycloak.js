
import Keycloak from 'keycloak-js';  

const keycloakConfig = {
    url: process.env.REACT_APP_KEYCLOAK, 
    realm: process.env.REACT_APP_KEYCLOAK_REALM, 
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID, 
    onLoad: process.env.REACT_APP_KEYCLOAK_ON_LOAD,
    logoutUrl: process.env.REACT_APP_KEYCLOAK + '/realms/' + process.env.REACT_APP_KEYCLOAK_REALM +'/protocol/openid-connect/logout?redirect_uri='
 }

 const keycloak = Keycloak(keycloakConfig);

 export default keycloak