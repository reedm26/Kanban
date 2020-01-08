<template>
  <div class="top row p-3 bg-dark">
    <div class="col-6">
      <router-link to="/">
        <button class="btn btn-outline-light btn-lg">Back To The Boards</button>
      </router-link>
    </div>
    <div class="col-6">
      <form @submit.prevent="addList">
        <input type="text" v-model="newList.title" required />
        <button class="btn btn-outline-light btn-lg">Add List</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      newList: {
        title: "",
        boardId: this.$route.params.boardId
      }
    };
  },
  methods: {
    addList() {
      let list = { ...this.newList };
      this.$store.dispatch("addList", list);
      this.newList = {
        title: "",
        boardId: this.$route.params.boardId
      };
    }
  }
};
</script>

<style>
</style>