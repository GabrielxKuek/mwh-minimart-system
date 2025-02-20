const { collection, doc, getDoc, getDocs, updateDoc, deleteDoc, addDoc, query, where } = require("firebase/firestore");
const { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, getMetadata } = require("firebase/storage");
const { db } = require("../configs/firebase");

const taskCollection = collection(db, "tasks");
const userTaskCollection = collection(db, "UserTask");
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

  async getUserTasks(userId) {
    try {
      // Create a query to get all UserTask documents for the specified user
      const userTaskQuery = query(userTaskCollection, where("user_id", "==", userId));
      const userTaskSnap = await getDocs(userTaskQuery);

      // Array to store the full task details
      const tasks = [];

      // Iterate through each UserTask document
      for (const userTaskDoc of userTaskSnap.docs) {
        const userTaskData = userTaskDoc.data();
        
        // Get the associated task details
        const taskDoc = await getDoc(doc(db, "tasks", userTaskData.task_id));
        
        if (taskDoc.exists()) {
          tasks.push({
            userTaskId: userTaskDoc.id,
            taskId: taskDoc.id,
            userId: userId,
            status: userTaskData.status_id,
            bookedAt: userTaskData.booked_at || null,
            updatedAt: userTaskData.updated_at || null,
            completionImage: userTaskData.completion_image || null,
            // Task details
            ...taskDoc.data()
          });
        }
      }

      return tasks;
    } catch (error) {
      console.error("Error getting user tasks:", error);
      throw new Error("Failed to get user tasks");
    }
  },

  async uploadTaskCompletion (userTaskId, file) {
    try {
      // Get reference to the UserTask document
      const userTaskRef = doc(db, "UserTask", userTaskId);
      const userTaskSnap = await getDoc(userTaskRef); 
  
      if (!userTaskSnap.exists()) {
        throw new Error("UserTask not found");
      }
  
      let completionImageUrl = null;
      const storage = getStorage();
  
      if (file) {
        const timestamp = new Date().getTime();
        const filename = `task_completion_images/${userTaskId}_${timestamp}_${file.originalname}`;
        
        // Upload the completion image
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file.buffer);
        const snapshot = await uploadTask;
        completionImageUrl = await getDownloadURL(snapshot.ref);
      }
  
      // Update the UserTask document with completion details
      const updateData = {
        completion_image: completionImageUrl,
        updated_at: new Date().toISOString(),
        status_id: "pending"
      };
  
      await updateDoc(userTaskRef, updateData);
  
      return {
        userTaskId,
        completionImageUrl,
        status: "completed",
        updatedAt: updateData.updated_at
      };
    } catch (error) {
      console.error("Error uploading task completion:", error);
      throw new Error("Failed to upload task completion");
    }
  },

  async getTaskRequests(statusFilter = ['pending', 'completed']) {
    try {
      const taskRequestsQuery = query(
        userTaskCollection,
        where("status_id", "in", Array.isArray(statusFilter) ? statusFilter : [statusFilter])
      );

      const userTasksSnapshot = await getDocs(taskRequestsQuery);
      const taskRequests = [];

      for (const userTaskDoc of userTasksSnapshot.docs) {
        const userTaskData = userTaskDoc.data();
        
        // Get task details
        const taskDoc = await getDoc(doc(db, "tasks", userTaskData.task_id));
        if (!taskDoc.exists()) continue;

        const taskData = taskDoc.data();

        taskRequests.push({
          userTaskId: userTaskDoc.id,
          task_id: userTaskData.task_id,
          user_id: userTaskData.user_id,
          status_id: userTaskData.status_id,
          booked_at: userTaskData.booked_at || "",
          updated_at: userTaskData.updated_at || "",
          completion_image: userTaskData.completion_image || "",
          task: {
            name: taskData.name,
            description: taskData.description,
            points: taskData.points,
            imageUrl: taskData.imageUrl
          }
        });
      }

      return taskRequests;
    } catch (error) {
      console.error("Error getting task requests:", error);
      throw new Error("Failed to get task requests");
    }
  },

  // Update task status
  async updateTaskStatus(userTaskId, newStatus) {
    try {
      const userTaskRef = doc(db, "UserTask", userTaskId);
      const userTaskSnap = await getDoc(userTaskRef);

      if (!userTaskSnap.exists()) {
        throw new Error("UserTask not found");
      }

      const updateData = {
        status_id: newStatus,
        updated_at: new Date().toISOString()
      };

      await updateDoc(userTaskRef, updateData);

      // Get the updated task data
      const updatedDoc = await getDoc(userTaskRef);
      const updatedData = updatedDoc.data();

      // Get the associated task details
      const taskDoc = await getDoc(doc(db, "tasks", updatedData.task_id));
      const taskData = taskDoc.exists() ? taskDoc.data() : null;

      return {
        userTaskId: userTaskId,
        task_id: updatedData.task_id,
        user_id: updatedData.user_id,
        status_id: updatedData.status_id,
        booked_at: updatedData.booked_at || "",
        updated_at: updatedData.updated_at,
        completion_image: updatedData.completion_image || "",
        task: taskData ? {
          name: taskData.name,
          description: taskData.description,
          points: taskData.points,
          imageUrl: taskData.imageUrl
        } : null
      };
    } catch (error) {
      console.error("Error updating task status:", error);
      throw new Error("Failed to update task status");
    }
  },

  async updateUserPoints(userId, points) {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error("User not found");
      }

      const userData = userSnap.data();
      const currentPoints = userData.current_points || 0;
      const totalPoints = userData.total_points || 0;

      // Update both current and total points
      await updateDoc(userRef, {
        current_points: currentPoints + points,
        total_points: totalPoints + points
      });

      return {
        userId,
        current_points: currentPoints + points,
        total_points: totalPoints + points
      };
    } catch (error) {
      console.error("Error updating user points:", error);
      throw new Error("Failed to update user points");
    }
  },

  async assignTaskPoints(userTaskId, status) {
    try {
      // Only proceed if the status is being set to 'completed'
      if (status !== 'completed') {
        return null;
      }

      // Get the UserTask document
      const userTaskRef = doc(db, "UserTask", userTaskId);
      const userTaskSnap = await getDoc(userTaskRef);

      if (!userTaskSnap.exists()) {
        throw new Error("UserTask not found");
      }

      const userTaskData = userTaskSnap.data();
      
      // Get the task details to know how many points to award
      const taskRef = doc(db, "tasks", userTaskData.task_id);
      const taskSnap = await getDoc(taskRef);

      if (!taskSnap.exists()) {
        throw new Error("Task not found");
      }

      const taskData = taskSnap.data();
      const pointsToAward = parseInt(taskData.points) || 0;

      // Update the user's points
      const result = await this.updateUserPoints(userTaskData.user_id, pointsToAward);

      return {
        ...result,
        points_awarded: pointsToAward
      };
    } catch (error) {
      console.error("Error assigning task points:", error);
      throw new Error("Failed to assign task points");
    }
  },

  async bookTask(userId, taskId) {
    try {
      // Check if user already has this task
      const existingBookingQuery = query(
        userTaskCollection,
        where("user_id", "==", userId),
        where("task_id", "==", taskId)
      );
      
      const existingBooking = await getDocs(existingBookingQuery);
      if (!existingBooking.empty) {
        throw new Error("User has already booked this task");
      }

      // Check if task exists
      const taskRef = doc(db, "tasks", taskId);
      const taskSnap = await getDoc(taskRef);
      if (!taskSnap.exists()) {
        throw new Error("Task not found");
      }

      // Create new UserTask document
      const userTaskData = {
        user_id: userId,
        task_id: taskId,
        status_id: "incomplete",
        booked_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completion_image: ""
      };

      const userTaskRef = await addDoc(userTaskCollection, userTaskData);

      return {
        userTaskId: userTaskRef.id,
        ...userTaskData,
        task: taskSnap.data()
      };
    } catch (error) {
      console.error("Error booking task:", error);
      throw error;
    }
  }
};

module.exports = taskModel;