// seed.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbXIIu8ySKx8GFdSESYPKfiAxR8RszYJk",
  authDomain: "proyecto-final-alvarez.firebaseapp.com",
  projectId: "proyecto-final-alvarez",
  storageBucket: "proyecto-final-alvarez.firebasestorage.app",
  messagingSenderId: "84507151159",
  appId: "1:84507151159:web:15afd939950d837379a8b2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
  { title: "Coca-Cola 500ml", price: 1200, stock: 20, category: "coca" },
  { title: "Coca-Cola 1.5L", price: 2000, stock: 15, category: "coca" },
  { title: "Sprite 500ml", price: 1100, stock: 25, category: "sprite" },
  { title: "Sprite 1.5L", price: 1900, stock: 18, category: "sprite" },
  { title: "Fanta 1L", price: 1700, stock: 10, category: "fanta" },
  { title: "Coca-Cola Zero 500ml", price: 1300, stock: 12, category: "coca-zero" }
];

async function seed() {
  try {
    for (const p of products) {
      const docRef = await addDoc(collection(db, "items"), p);
      console.log("Agregado:", docRef.id, p.title);
    }
    console.log("Seed terminado");
  } catch (err) {
    console.error("Error cargando productos:", err);
  }
}

seed();
