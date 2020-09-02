import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import {
  firestorePlugin
} from 'vuefire'
Vue.use(firestorePlugin)

import 'firebase/firestore'

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCkzxhu5i13mW9VbQG_UcoNq5BTTXNT3RM",
  authDomain: "vuetube-2aec0.firebaseapp.com",
  databaseURL: "https://vuetube-2aec0.firebaseio.com",
  projectId: "vuetube-2aec0",
  storageBucket: "vuetube-2aec0.appspot.com",
  messagingSenderId: "422623560491",
  appId: "1:422623560491:web:7229ead87a7cd8dc3dfb6e",
  measurementId: "G-SE07N1J8MX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')