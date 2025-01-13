// this file just for you guys' reference. i made in year 1, might not be v optimised LOL
// also since we using firebase its not accurate HAHAHAHA

const { collection, addDoc, getDocs } = require("firebase/firestore");
const { db } = require("../configs/firebase"); // Assuming you have a firebase.js in config folder

const taskCollection = collection(db, "tasks"); // Reference to the "tasks" collection

module.exports.insertSingle = async (data) => {
  try {
    const docRef = await addDoc(taskCollection, data);
    return { id: docRef.id, ...data }; // Return the new task data including the generated ID
  } catch (error) {
    console.error("Error adding document:", error);
    throw error; // Let the controller handle the error
  }
};

module.exports.getAllTasks = async () => {
  try {
    const dataRef = collection(db, "tasks"); // Reference to the specified collection
    const snapshot = await getDocs(dataRef); // Get all documents
    const data = snapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID
      ...doc.data(), // Spread the document data
    }));
    return data; // Return the array of documents
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Let the caller handle the error
  }
};

