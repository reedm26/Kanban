<template>
  <div class="boards container-fluid">
    <home-top />
    <div class="row">
      <div class="col-12">
        <ol
          class="list-group list-group-flush"
          v-for="board in boards"
          :key="board._id"
        >
          <li class="list-group-item text-left">
            <router-link
              :to="{ name: 'board', params: { boardId: board._id } }"
            >
              <h3 class="">{{ board.title }}</h3>
            </router-link>
          </li>
        </ol>
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
