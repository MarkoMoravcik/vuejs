<template>
  <div class="container">
    <div class="welcome">{{welcomeMessage}}</div>
    <div class="alert alert-primary" v-show="message">{{ message }}</div>
    <div>
      <div class="form-group row">
        <label for="Name" class="col-sm-1">Title</label>
        <div class="col-sm-4">
          <input type="text" id="Name" v-model="model.Name" class="form-control"
          @keyup.enter="addToDo()">
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            id="isCompleted"
            v-model="model.IsCompleted"
            class="form-check-input"
          >
          <label for="isCompleted" class="form-check-label">Completed</label>
        </div>
      </div>
      <div>
        <button type="submit" @click="addToDo()" class="btn btn-primary">Add ToDo</button>
      </div>
    </div>

    <section>
      <ol class="list-group">
        <li
          class="list-group-item"
          v-for="todo of ToDos"
          :key="todo.Name"
        >{{ todo.Name}}, {{ todo.IsCompleted ? "Completed" : "Not Done" }}</li>
      </ol>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator';
import ToDoModel from '@/models/ToDoModel';
import store from '@/store';

@Component({
  components: {
  },
  props: {
    id: {
      required: true,
      type: Number,
    },
  },
})

export default class ToDo extends Vue {
  private welcomeMessage: string;

  private message: string;

  private todos: Array<ToDoModel>;

  private model: ToDoModel;

  constructor() {
    super();
    this.welcomeMessage = 'Welcome to ToDo App!';
    this.todos = [];
    this.model = new ToDoModel();
    this.message = '';
  }

  get ToDos(): ToDoModel[] {
    const { todos, } = this.$store.state;
    return todos;
  }

  addToDo() {
    /* eslint-disable */
    this.message = `Adding ${this.model.Name} to ToDo List ...`; 
    if (this.ToDos.some(x => x.Name == this.model.Name)) {
      this.message = `ToDo item ${this.model.Name} already exists in your list`;
      return;
    }
        debugger;
    this.$store
      .dispatch('addToDo', this.model)
      .then(() => {
            debugger;
        this.message = 'ToDo added successfully to your list';
        setTimeout(() => {
          this.message = '';
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
      });
    this.model = new ToDoModel();
    this.message = '';
  }
}
</script>


<style scoped>
.welcome {
  color: #090629e5;
  margin: 20px;
  font-size: 20px;
}
.message {
  margin: 20px;
  font-size: 14px;
}
section {
  margin: 20px;
}
ol.list-group li:nth-of-type(even) {
  background: #cdecda;
}
</style>
