<template>
  <div id="app">
    <div class="header">
      <img src="./assets/logo_gol.png" width="200px">
    </div>
    <AddToDo v-bind:taskData=taskData />
    <ToDoList />
    <SelectedToDo />
    <DoneList />
  </div>
</template>

<script>
import AddToDo from './components/addToDo'
import ToDoList from './components/toDoList'
import SelectedToDo from './components/selectedToDo'
import DoneList from './components/doneList'

export default {
  name: 'App',
  components: {
    AddToDo,
    ToDoList,
    DoneList,
    SelectedToDo
  },
   props: {
    taskData: Object
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
.header {
  background: #000;
}
</style>
