// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Firestore desde Firebase
import { getFirestore, collection, addDoc, getDocs, deleteDoc , doc, getDoc} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARTs0V2--s7sDLpXipST3iCTj_XVBoBk8",
  authDomain: "proyecto-fe-2ce52.firebaseapp.com",
  projectId: "proyecto-fe-2ce52",
  storageBucket: "proyecto-fe-2ce52.appspot.com",
  messagingSenderId: "1096533242072",
  appId: "1:1096533242072:web:8c7b551b6e213ca3af27ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Crear un Nuevo Producto
export async function crearProducto(Nombre, Precio, Imagen, collectionID){
    try {
        const docRef = await addDoc(collection(db, collectionID), {
        Nombre: Nombre,
        Precio: Precio,
        Imagen: Imagen
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
// Leer data. Traer al carrito
 export const obtenerProductos = async() =>{
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = []

    querySnapshot.forEach((doc) => {
    products.push(doc);
    })
    return products
}


// Eliminar documentos
// export const eliminarProductos = (id) => await deleteDoc(doc(db, "products", id));

// Obtener un unico item de la base de Firebase
export const obtenerProducto = async (id)=> { 

    const docRef = doc(db, 'products', id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    return docSnap;
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
}