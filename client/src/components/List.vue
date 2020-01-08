<template>
  <div class="card list" style="width: 18rem;">
    <div class="card-header">
      <h5>
        {{ listData.title }}
        <i class="fa fa-plus" @click="showModal"></i>
      </h5>
    </div>
    <div class="card-body" v-for="task in tasks" :key="task.id">
      <task :taskData="task" />
    </div>
    <modal name="listModal">
      <form @submit.prevent="addTask">
        <label for="description">Add A Task</label>
        <input
          type="text"
          placeholder="description"
          v-model="newTask.description"
          required
          name="description"
        />
        <button @click="hideModal" class="btn btn-outline-dark btn-lg">
          Create Task
        </button>
      </form>
    </modal>
  </div>
</template>

<script>
import task from "@/components/Task";
export default {
  name: "list",
  props: ["listData"],
  data() {
    return {
      newTask: {
        description: "",
        listId: this.listData.id,
        boardId: this.listData.boardId
      }
    };
  },
  methods: {
    addTask() {
      let task = { ...this.newTask };
      console.log(task);
      this.$store.dispatch("addTask", task);
      this.newTask = {
        description: "",
        listId: this.listData.id,
        boardId: this.listData.boardId
      };
    },
    showModal() {
      this.$modal.show("listModal");
    },
    hideModal() {
      this.$modal.hide("listModal");
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  components: {
    task
  }
};
</script>

<style scoped></style>
