<template>
  <li class="task list-group-item text-dark">
    <h5 class>{{ taskData.description }}</h5>

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
export default {
  name: "task",
  props: ["taskData", "listData"],
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
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    }
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
