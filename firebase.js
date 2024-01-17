import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyDg5Kgt-1XGgONJOt65IHvSWaOOaNNsq0Y',
  authDomain: 'semonun-9c052.firebaseapp.com',
  projectId: 'semonun-9c052',
  storageBucket: 'semonun-9c052.appspot.com',
  messagingSenderId: '1049958045727',
  appId: '1:1049958045727:web:3a82bfbd823837ac6cdd2a',
  measurementId: 'G-EXS32F3PS2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);
