import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase 프로젝트에서 복사해온 구성 객체 넣기
const firebaseConfig = {
    apiKey: "AIzaSyAZa-V7Sl8JJXiXyZg9I-h073gZ3lbUNdw",
    authDomain: "portfolio-7b179.firebaseapp.com",
    projectId: "portfolio-7b179",
    storageBucket: "portfolio-7b179.firebasestorage.app",
    messagingSenderId: "654699682590",
    appId: "1:654699682590:web:4d783270c0d3c8d5b1870f",
    measurementId: "G-1XBS7HN2C8"
  };

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore & Storage 인스턴스 가져오기
export const fireDB = getFirestore(app);
export const fireStorage = getStorage(app);
