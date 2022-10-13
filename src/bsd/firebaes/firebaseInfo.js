// issu 해결 요망

// // Get the required features from the SDK

// // Import to use firebase initial
// import { initializeApp } from "firebase/app";
// // Import to use firestore
// import { getFirestore } from "firebase/firestore";

// // Web firebase component and SDK
// const firebaseConfig = {
//   apiKey: `${process.env.REACT_APP_API_KEY}`,
//   authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
//   projectId: `${process.env.REACT_APP_PROJECT_ID}`,
//   storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
//   messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
//   appId: `${process.env.REACT_APP_APP_ID}`
// };

// // Crate obj & Initialize firebase  
// const app = initializeApp(firebaseConfig);
// // Create firestore obj
// const dbService = getFirestore(app);
// // Export firebase, firestore
// export { app, dbService };