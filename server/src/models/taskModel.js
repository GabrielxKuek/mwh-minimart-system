const { collection, doc, getDoc, getDocs, updateDoc, deleteDoc, addDoc } = require("firebase/firestore");
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { db } = require("../configs/firebase");

const taskCollection = collection(db, "tasks");
const storage = getStorage();

const taskModel = {
  async addTask(taskData, file) {
    try {
      let imageUrl = null;
      if (file) {
        const storageRef = ref(storage, `task_images/${Date.now()}_${file.originalname}`);
        const uploadTask = uploadBytesResumable(storageRef, file.buffer);
        const snapshot = await uploadTask;
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const taskRef = await addDoc(taskCollection, { ...taskData, imageUrl });
      return { id: taskRef.id, ...taskData, imageUrl };
    } catch (error) {
      console.error("Error adding task:", error);
      throw new Error("Failed to add task");
    }
  },

  async getTaskById(taskId) {
    try {
      const taskRef = doc(db, "tasks", taskId);
      const taskSnap = await getDoc(taskRef);

      if (!taskSnap.exists()) {
        return null; // Task not found
      }

      return { id: taskSnap.id, ...taskSnap.data() };
    } catch (error) {
      console.error("Error getting task:", error);
      throw new Error("Failed to get task");
    }
  },

  async getAllTasks() {
    try {
      const tasksSnap = await getDocs(taskCollection);
      const tasks = tasksSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return tasks;
    } catch (error) {
      console.error("Error getting all tasks:", error);
      throw new Error("Failed to get all tasks");
    }
  },

  async updateTask(taskId, taskData, file) {
    try {
      const taskRef = doc(db, "tasks", taskId);

      let imageUrl = taskData.imageUrl; // Keep existing URL by default
      if (file) {
        const storageRef = ref(storage, `task_images/${Date.now()}_${file.originalname}`);
        const uploadTask = uploadBytesResumable(storageRef, file.buffer);
        const snapshot = await uploadTask;
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      console.log("Updating task in Firestore with ID:", taskId); // Add logging here
      console.log("Updated task data:", { ...taskData, imageUrl }); // Add logging here

      const updateData = { ...taskData };
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      } else {
        delete updateData.imageUrl; // Remove imageUrl field if it's undefined or empty
      }

      await updateDoc(taskRef, updateData);
      return { id: taskId, ...taskData, imageUrl };
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Failed to update task");
    }
  },

  async deleteTask(taskId) {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef);
      return { id: taskId };
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task");
    }
  },
};

module.exports = taskModel;