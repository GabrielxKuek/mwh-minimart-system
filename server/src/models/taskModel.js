const { collection, doc, getDoc, getDocs, updateDoc, deleteDoc, addDoc } = require("firebase/firestore");
const { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, getMetadata } = require("firebase/storage");
const { db } = require("../configs/firebase");

const taskCollection = collection(db, "tasks");
const storage = getStorage();

const taskModel = {
  async addTask(taskData, file) {
    try {
      let imageUrl = null;
      if (file) {
        const storageRef = ref(storage, `task_images/${file.originalname}`);
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

      console.log("Received taskData:", taskData); // Add logging here
      let imageUrl = taskData.imageUrl; // Keep existing URL by default
      console.log("Current imageUrl:", imageUrl); // Add logging here
      console.log("Received file:", file); // Add logging here
      if (file) {
        // Delete the old image if it exists
        if (imageUrl) {
          const pathStartIndex = imageUrl.indexOf("/o/") + 3;
          const pathEndIndex = imageUrl.indexOf("?alt=media");
          const oldImagePath = decodeURIComponent(imageUrl.substring(pathStartIndex, pathEndIndex));
          console.log("Old image path:", oldImagePath); // Add logging here
          const oldImageRef = ref(storage, oldImagePath);

          // Check if the old image exists before attempting to delete it
          try {
            await getMetadata(oldImageRef);
            await deleteObject(oldImageRef);
            console.log("Old image deleted:", oldImagePath); // Add logging here
          } catch (error) {
            if (error.code === 'storage/object-not-found') {
              console.warn(`Old image not found: ${oldImagePath}`); // Log a warning if the old image does not exist
            } else {
              throw error; // Re-throw the error if it's not a "not found" error
            }
          }
        }

        const storageRef = ref(storage, `task_images/${file.originalname}`);
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
      const taskSnap = await getDoc(taskRef);

      if (!taskSnap.exists()) {
        throw new Error("Task not found");
      }

      const taskData = taskSnap.data();
      const imageUrl = taskData.imageUrl;

      // Delete the image from storage if it exists
      if (imageUrl) {
        const pathStartIndex = imageUrl.indexOf("/o/") + 3;
        const pathEndIndex = imageUrl.indexOf("?alt=media");
        const imagePath = decodeURIComponent(imageUrl.substring(pathStartIndex, pathEndIndex));
        console.log("Image path to delete:", imagePath); // Add logging here
        const imageRef = ref(storage, imagePath);

        // Check if the image exists before attempting to delete it
        try {
          await getMetadata(imageRef);
          await deleteObject(imageRef);
          console.log("Image deleted:", imagePath); // Add logging here
        } catch (error) {
          if (error.code === 'storage/object-not-found') {
            console.warn(`Image not found: ${imagePath}`); // Log a warning if the image does not exist
          } else {
            throw error; // Re-throw the error if it's not a "not found" error
          }
        }
      }

      await deleteDoc(taskRef);
      console.log("Task deleted from Firestore with ID:", taskId); // Add logging here
      return { id: taskId };
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task");
    }
  },
};

module.exports = taskModel;