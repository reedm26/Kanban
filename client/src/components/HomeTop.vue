<template>
  <div class="top row bg-dark">
    <div class="col-6">
      <h1 class="text-white">The Boards</h1>
    </div>
    <div class="col-6">
      <form @submit.prevent="addBoard">
        <input type="text" placeholder="title" v-model="newBoard.title" required />
        <input type="text" placeholder="description" v-model="newBoard.description" required />
        <button class="btn btn-outline-light btn-lg" type="submit">Create Board</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  }
};
</script>

<style>
</style>