<template>
  <div class="boards container-fluid">
    <home-top />
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="addBoard">
          <input type="text" placeholder="title" v-model="newBoard.title" required />
          <input type="text" placeholder="description" v-model="newBoard.description" required />
          <button type="submit">Create Board</button>
        </form>
      </div>
      <div class="card mx-auto" v-for="board in boards" :key="board._id">
        <div class="card-body">
          <router-link :to="{name: 'board', params: {boardId: board._id}}">
            <h3>{{board.title}}</h3>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homeTop from "@/components/HomeTop";
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  },
  components: {
    homeTop
  }
};
</script>