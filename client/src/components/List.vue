<template>
  <div class="card list bg-dark text-light">
    <div class="card-header">
      <h4 class="listTitle">{{ listData.title }}</h4>
      <i @click="deleteList" class="fa fa-close"></i>
      <i class="fa fa-plus" @click="showModal"></i>
    </div>
    <ul class="list-group list-group-flush" v-for="(task, i) in tasks" :key="i">
      <task :taskData="task" @passed="passTaskId" />
    </ul>

    <modalTwo id="comment" :taskData="task" v-for="task in tasks" :key="task._id" />

    <modal id="modal" :name="'listModal' + this.listData.id">
      <form class="text-center" @submit.prevent="addTask">
        <label for="description">
          <h4 class="text-dark mt-2">Add A Task</h4>
        </label>
        <input
          class="mb-2"
          type="text"
          placeholder="description"
          v-model="newTask.description"
          required
          name="description"
        />
        <button
          @click="hideModal"
          class="btn btn-outline-light text-light bg-dark btn-lg"
        >Create Task</button>
      </form>
    </modal>
  </div>
</template>

<script>
import task from "@/components/Task";
import modalTwo from "@/components/Modal";

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
      },
      taskId: ""
    };
  },
  methods: {
    addTask(id) {
      let task = { ...this.newTask };
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
    },
    showCommentModal() {
      this.$comment.show("commentModal");
    },
    hideCommentModal() {
      this.$comment.hide("commentModal");
    },
    passTaskId(taskId) {
      this.taskId = taskId;
    }
  },
  computed: {
    tasks() {
      let tasks = this.$store.state.tasks[this.listData.id] || [];
      return tasks;
    },
    lists() {
      return this.$store.state.lists;
    },
    comments() {
      return this.$store.state.comments[this.taskId] || [];
    }
  },
  components: {
    task,
    modalTwo
  }
};
</script>

<style>
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
.v--modal {
  width: 250px !important;
  height: 180px !important;
  left: 43% !important;
}
</style>
