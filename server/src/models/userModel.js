const {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} = require("firebase/firestore");
const { db } = require("../configs/firebase.js");

const usersCollection = collection(db, "users");

const userModel = {
  addUser: function (userData) {
    const now = new Date();
    return addDoc(usersCollection, {
      ...userData,
      current_points: 0,
      total_points: 0,
      created_at: now, // Set created_at to the current timestamp
      updated_at: now, // Set updated_at to the current timestamp
    })
      .then((docRef) => {
        return docRef.id;
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        throw error;
      });
  },

  getUserById: function (userId) {
    const docRef = doc(usersCollection, userId);
    return getDoc(docRef)
      .then((docSnap) => {
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
      })
      .catch((error) => {
        console.error("Error getting user:", error);
        throw error;
      });
  },

  getAllUsers: function () {
    return getDocs(usersCollection)
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      })
      .catch((error) => {
        console.error("Error getting all users:", error);
        throw error;
      });
  },

  updateUser: function (userId, updatedData) {
    const docRef = doc(usersCollection, userId);
    return updateDoc(docRef, { ...updatedData, updated_at: new Date() }) // Set updated_at to the current timestamp
      .catch((error) => {
        console.error("Error updating user:", error);
        throw error;
      });
  },

  findUsers: function (criteria) {
    const q = query(
      usersCollection,
      where(criteria.field, "==", criteria.value)
    );
    return getDocs(q)
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      })
      .catch((error) => {
        console.error("Error finding users:", error);
        throw error;
      });
  },

  getCurrentPointsByUserId: function(userId) {
    const docRef = doc(usersCollection, userId);
    return getDoc(docRef)
      .then((docSnap) => {
        if (!docSnap.exists()) {
          throw new Error('User not found');
        }
        return docSnap.data().current_points;
      })
      .catch((error) => {
        console.error("Error getting user points:", error);
        throw error;
      });
  }
};

module.exports = userModel;