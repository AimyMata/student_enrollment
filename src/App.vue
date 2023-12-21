<template>
  <h1>Student Academic Grades</h1>
  <div id="app">
    <div v-if="students.length === 0">No students available</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Math</th>
            <th>Science</th>
            <th>English</th>
            <th>Filipino</th>
            <th>Average</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="index">
            <td>{{ student.name }}</td>
            <td>{{ student.math }}</td>
            <td>{{ student.science }}</td>
            <td>{{ student.english }}</td>
            <td>{{ student.filipino }}</td>
            <td>{{ calculateAverage(student) }}</td>
            <td>{{ calculateRemarks(student) }}</td>
            <td>
              <button @click="removeStudent(index)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

import { db } from "../firebase";

export default {
  data() {
    return {
      students: [],
    };
  },
  mounted() {
    const studentsCollection = collection(db, "students");

    // Listen for changes in the students collection
    onSnapshot(studentsCollection, (snapshot) => {
      this.students = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  },
  methods: {
    calculateAverage(student) {
      const grades = [
        student.math,
        student.science,
        student.english,
        student.filipino,
      ];
      const sum = grades.reduce((acc, grade) => acc + grade, 0);
      return (sum / grades.length).toFixed(2);
    },
    calculateRemarks(student) {
      const average = this.calculateAverage(student);
      return average >= 75 ? "Passed" : "Failed";
    },
    async removeStudent(index) {
      const studentId = this.students[index].id;
      const studentRef = doc(db, "students", studentId);

      try {
        await deleteDoc(studentRef);
      } catch (error) {
        console.error("Error removing student: ", error);
      }
    },
  },
};
</script>
<style scoped>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

td:hover {
  background-color: white;
}

button {
  background-color: #ee3232;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

div[v-if] {
  margin-top: 20px;
  text-align: center;
  font-style: italic;
  color: #888;
}
</style>
