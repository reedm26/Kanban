<template>
  <div class="boards container-fluid">
    <home-top />
    <div class="row">
      <div class="col-6">
        <div class="card bg-dark m-1 text-light" v-for="board in boards" :key="board._id">
          <div class="card-header text-center">
            <router-link :to="{ name: 'board', params: { boardId: board._id } }">
              <h3 class>{{ board.title }}</h3>
            </router-link>
            <i @click="deleteBoard(board._id)" class="fa fa-close"></i>
          </div>
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
    return {};
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    deleteBoard(id) {
      if (confirm("Are You Sure You Want To Delete This Board?")) {
        this.$store.dispatch("deleteBoard", id);
      }
    }
  },
  components: {
    homeTop
  }
};
</script>
<style scoped>
h3 {
  display: inline-block;
}
i {
  float: right;
}
</style>