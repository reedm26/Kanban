<template>
  <div class="boards container-fluid">
    <home-top />
    <div class="row">
      <div class="col-12"></div>
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
    return {};
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {},
  components: {
    homeTop
  }
};
</script>