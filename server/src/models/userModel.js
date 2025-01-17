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
const changelogCollection = collection(db, "changelog");

const userModel = {
  addUser: async function (userData) {
    const userRef = await addDoc(usersCollection, {
      ...userData,
      current_points: 0,
      total_points: 0,
    });

    // Log the add action
    await addDoc(changelogCollection, {
      type: "User",
      action: "added",
      name: userData.name,
      status: userData.status_id,
      timestamp: new Date(),
    });

    return userRef.id;
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

  updateUser: async function (userId, updatedData) {
    const docRef = doc(usersCollection, userId);
    await updateDoc(docRef, { ...updatedData });

    // Retrieve the updated user data to ensure the name field is present
    const userSnap = await getDoc(docRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      // Log the update action
      await addDoc(changelogCollection, {
        type: "User",
        action: "updated",
        name: userData.name,
        status: updatedData.status_id,
        timestamp: new Date(),
      });
    }
  },

  suspendUser: async function (userId) {
    const docRef = doc(usersCollection, userId);
    await updateDoc(docRef, { status_id: "suspended" });

    // Log the suspend action
    const userSnap = await getDoc(docRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      await addDoc(changelogCollection, {
        type: "User",
        action: "suspended",
        name: userData.name,
        status: "suspended",
        timestamp: new Date(),
      });
    }
  },

  reactivateUser: async function (userId) {
    const docRef = doc(usersCollection, userId);
    await updateDoc(docRef, { status_id: "active" });

    // Log the reactivate action
    const userSnap = await getDoc(docRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      await addDoc(changelogCollection, {
        type: "User",
        action: "reactivated",
        name: userData.name,
        status: "active",
        timestamp: new Date(),
      });
    }
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