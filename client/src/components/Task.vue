<template>
  <li class="task list-group-item text-dark">
    <h5 class="">
      {{ taskData.description }}
    </h5>
    <i @click="deleteTask" class="fa fa-close"></i>
  </li>
</template>

<script>
export default {
  name: "task",
  props: ["taskData"],
  methods: {
    deleteTask() {
      if (confirm("Are You Sure You Want To Delete This Task?")) {
        this.$store.dispatch("deleteTask", [
          this.taskData.id,
          this.taskData.listId
        ]);
      }
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
i {
  float: right;
  padding: 5px;
}
</style>
