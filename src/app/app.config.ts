import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync('noop'), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-9008a","appId":"1:1078255961196:web:f56f9588c1668df0cd0449","storageBucket":"ring-of-fire-9008a.appspot.com","apiKey":"AIzaSyDlSWTbhGDp_xOBYWKW992XGM_YT1ui-NU","authDomain":"ring-of-fire-9008a.firebaseapp.com","messagingSenderId":"1078255961196"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
