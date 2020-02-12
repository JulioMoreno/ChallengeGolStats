<template>
  <div>
    <p v-if="errors.length">
    <b>Por favor llena los siguientes campos:</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>
    <form id="app" @submit.prevent="createTask">
      <p>Título:</p>
      <input type="text" class="field" v-model="title" id="task" /><br>
      <p>Estado:</p>
      <select v-model="state" class="field"><br>
        <option disabled value>Seleccione un estado</option>
        <option>Pendiente</option>
        <option>Realizada</option>
      </select>
      <p>Prioridad:</p>
      <select v-model="priority" class="field"><br>
        <option disabled value>Seleccione una prioridad</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <p>Fecha y hora:</p>
      <datetime type="datetime" class="field" v-model="datetime"></datetime><br>
      <input type="submit" class="btn" value="Crear tarea" />
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios';
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

export default {
  data: () => ({
    errors: [],
    title: "",
    state: null,
    priority: null,
    datetime: null,
    tasks : {},
  }),
  components: {
    datetime: Datetime
  },
  methods: {
    createTask() {
      if (this.validateForm()) {
      this.tasks.title = this.title;
      this.tasks.state = this.state;
      this.tasks.priority = this.priority;
      this.tasks.datetime = this.datetime;
      this.addTask();
      this.cleanForm();
      console.log(this.tasks);
      }
    },
    addTask() {
      axios.post(`http://localhost:3000/task`,{
            body: JSON.stringify(this.tasks)
        })
        .then(response => {
            if(response.status === 200)
                console.log(response.status);
                alert('Tarea agreada');
          })
          .catch(e => {
            console.log(e)
          })
    },
    validateForm() {
      if(this.title & this.state & this.priority & this.datetime)
        return true
      this.errors = [];
      if(!this.title) this.errors.push("Título es requerido.");
      if(!this.state) this.errors.push("Estado es requerido.");  
      if(!this.priority) this.errors.push("Prioridad es requerido.");
      if(!this.datetime) this.errors.push("Fecha y hora es requerido.");  
      return this.errors.length ? false : true;
    },
    cleanForm() {
      this.title = "";
      this.state = null;
      this.priority = null;
      this.datetime = null;
    }
  }
};
</script>

<style>
form {
  margin: 0 auto;
  margin-top: 15px;
  color: #999;
  font-size: 0.8em;
  padding: 10px;
  width: 330px;
}
input, select {
  border: 0;
  outline: none;
}
.field {
  border: solid 1px #ccc;
  padding: 8px;
  width: 90%;
}
.field:focus {
  border-color: #18A383;
}
.btn {
  border-radius: 3px;
  color: #fff;
  padding: 15px 15px;
  text-decoration: none;
  background-color: #00cb00;
}
</style>