export const environment = {
  production: false,
      api_host: "http://localhost:8082/api/",
      locale_id: 'fr-FR',
      keycloak: {
        authority: 'http://localhost:8080',
        redirectUri: 'http://localhost:4200/*',
        postLogoutRedirectUri: 'http://localhost:4200/logout',
        realm: 'pointage_back_dev',
        clientId: 'pointage_front_dev',
    },

    idleConfig: { idle: 10, timeout: 60, ping: 10 },

};


