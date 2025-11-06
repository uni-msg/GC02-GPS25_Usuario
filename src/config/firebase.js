import dotenv from "dotenv";
dotenv.config();
//Trabajaremos con la libreria de firebase-admin, no la parte de cliente
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({ //crea el objeto firebase-service-account con los datos del .env asi es mas privado
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const firebaseAdmin = admin;
