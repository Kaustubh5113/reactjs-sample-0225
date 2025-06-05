import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../lib/firebase'; // adjust path as needed

const handleAddTask = async () => {
  if (newTaskTitle.trim() === '') return;

  const newTask = {
    title: newTaskTitle.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    const docRef = await addDoc(collection(db, "tasklists"), newTask);
    setTasks((prev) => [...prev, { id: docRef.id, ...newTask }]);
    closeAddTaskPopup();
  } catch (error) {
    console.error("Error adding task to Firebase:", error);
  }
};
