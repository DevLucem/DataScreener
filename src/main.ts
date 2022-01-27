import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import {createRouter, createWebHistory} from 'vue-router'
import firebase from "./firebase";

import Home from './pages/Home.vue';
import Data from './pages/Data.vue';
import Updates from './pages/Updates.vue';

const app = createApp(App);
app.use(createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/home', component: Home},
        {path: '/data', component: Data},
        {path: '/updates', component: Updates},
        {path: '/:pathMatch(.*)*', redirect: "/home"}
    ]
}))
app.use(firebase)

app.mount('#app')
