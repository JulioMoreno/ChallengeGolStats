<template>
  <div v-if="tasks.length">
    <h1>Tareas pendientes</h1>
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Estado</th>
          <th>Prioridad</th>
          <th>Fecha y hora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks">
          {{task.title}}
          <td>{{task.state}}</td>
          <td>{{task.priority}}</td>
          <td>{{task.datetime}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      errors: []
    };
  },
  methods: {
    getTasks() {
      axios
        .get(`http://localhost:3000/taskPending`)
        .then(response => {
          if (response.status === 200) this.tasks = response.data;
          console.log(this.tasks);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    console.log("listado montado");
    this.getTasks();
  }
};
</script>

<style>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  margin: 0 auto;
}
th {
  min-width: 120px;
  padding: 10px 20px;
}
</style>