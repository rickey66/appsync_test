import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')

import { Amplify } from 'aws-amplify';

Amplify.configure({
    API: {
        GraphQL: {
            endpoint: 'https://ez3vv72fy5dlbgg2oo6wcirwpy.appsync-api.ap-northeast-1.amazonaws.com/graphql',
            region: 'ap-northeast-1',
            defaultAuthMode: 'apiKey',
            apiKey: 'da2-um5ba6hq6vemzhmqd4yqxj5vfu'
        }
    }
});