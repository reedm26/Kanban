<template>
  <div class="card list bg-dark text-light" style="width: 18rem;">
    <div class="card-header">
      <h4 class="listTitle">
        {{ listData.title }}
      </h4>
      <i class="fa fa-plus" @click="showModal"></i>
      <i @click="deleteList" class="fa fa-close"></i>
    </div>
    <ul
      class="list-group list-group-flush"
      v-for="task in tasks"
      :key="task.id"
    >
      <task :taskData="task" />
    </ul>
    <modal :name="'listModal' + this.listData.id">
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
  mounted() {
    this.$store.dispatch("getTasksByListId", this.listData.id);
  },
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
    addTask(id) {
      let task = { ...this.newTask };
      console.log(task);
      this.$store.dispatch("addTask", task);
      this.newTask = {
        description: "",
        listId: this.listData.id,
        boardId: this.listData.boardId
      };
    },
    deleteList() {
      if (confirm("Are You Sure You Want To Delete This List?")) {
        this.$store.dispatch("deleteList", [
          this.listData.id,
          this.listData.boardId
        ]);
      }
    },
    showModal() {
      this.$modal.show("listModal" + this.listData.id);
    },
    hideModal() {
      this.$modal.hide("listModal" + this.listData.id);
    }
  },
  computed: {
    tasks() {
      console.log(this.$store.state.tasks);
      let tasks = this.$store.state.tasks[this.listData.id] || [];
      console.log(tasks);
      return tasks;
    }
  },
  components: {
    task
  }
};
</script>

<style scoped>
h4 {
  float: left;
}
i {
  float: right;
  padding: 7px;
}
.listTitle {
  text-align: start;
  display: inline-block;
}
modal {
}
</style>
