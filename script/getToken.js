// script/getToken.js
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.FIREBASE_API_KEY;
if (!API_KEY) {
  console.error("ERROR: define FIREBASE_API_KEY en .env (la API key del proyecto Firebase).");
  process.exit(1);
}

async function signInWithEmailAndPassword(email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });

  const body = await resp.json();

  if (!resp.ok) {
    const message = body?.error?.message || JSON.stringify(body);
    throw new Error(`Firebase signIn error: ${message}`);
  }

  return body;
}

async function main() {
  const [,, email, password] = process.argv;

  if (!email || !password) {
    console.log("Uso: node script/getToken.js <email> <password>");
    process.exit(1);
  }

  try {
    const result = await signInWithEmailAndPassword(email, password);
    console.log("✅ Token obtenido con éxito:");
    console.log("idToken:", result.idToken);
    console.log("refreshToken:", result.refreshToken);
    console.log("uid:", result.localId);
    console.log("expiresIn:", result.expiresIn);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

main();
