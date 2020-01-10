<template>
  <li class="task list-group-item text-dark">
    <h5 class>{{ taskData.description }}</h5>
    <i
      class="fa fa-plus"
      data-toggle="modal"
      @click="passTaskData"
      :data-target="'#modal' + taskData.id"
    ></i>

    <div class="dropdown">
      <button
        class="btn btn-secondary btn-sm dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      ></button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" @click="deleteTask">Delete</a>
        <span class="dropdown-item-text">Move To</span>
        <a
          v-for="list in lists"
          :key="list.id"
          @click="moveTask(list.id)"
          class="dropdown-item"
        >{{list.title}}</a>
      </div>
    </div>
  </li>
</template>

<script>
import comment from "@/components/Comment";
import modalTwo from "@/components/Modal";

export default {
  name: "task",
  mounted() {},
  data() {
    return {
      newComment: {
        content: "",
        taskId: this.taskData.id
      }
    };
  },
  props: ["taskData", "listData", "commentData"],
  methods: {
    deleteTask() {
      if (confirm("Are You Sure You Want To Delete This Task?")) {
        this.$store.dispatch("deleteTask", [
          this.taskData.id,
          this.taskData.listId
        ]);
      }
    },
    moveTask(id) {
      this.$store.dispatch("editTask", [
        this.taskData.id,
        this.taskData.listId,
        id
      ]);
    },
    addComment() {
      let comment = { ...this.newComment };
      this.$store.dispatch("addComment", comment);
      this.newComment = {
        content: "",
        taskId: this.taskData.id
      };
    },
    showCommentModal() {
      this.$modal.show("commentModal" + this.taskData.id);
      this.$modal.show(comment);
    },
    hideCommentModal() {
      this.$modal.hide("commentModal" + this.taskData.id);
    },
    passTaskData() {
      this.$emit("passed", this.taskData.id);
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
    comments() {
      return this.$store.state.comments[this.taskData.id] || [];
    }
  },
  components: {
    comment,
    modalTwo
  }
};
</script>

<style scoped>
h5 {
  float: left;
}
li {
  display: inline-block;
}
.dropdown {
  float: right;
  padding: 5px;
}
</style>
