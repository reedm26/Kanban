<template>
  <div class="boards container-fluid">
    <home-top />
    <div class="row">
      <div class="col-6 bg-api">
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

    //   getPicture() {
    //   //NOTE You will not need to change this method
    //   let url = "https://api.unsplash.com/photos/?client_id=i9iKIFediPEI-GhPSNZXu9-YAPNfSi4ZGx67VJiUiq8";
    //   // @ts-ignore
    //   $.getJSON(url)
    //     .then(res => {
    //       let results = res.results.map(rawData => new pic(rawData));
    //       store.commit("songs", results);
    //     })
    //     .catch(err => {
    //       throw new Error(err);
    //     })
    // };
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
bg-api {
  background-image: url("https://api.unsplash.com/photos/random/?client_id=i9iKIFediPEI-GhPSNZXu9-YAPNfSi4ZGx67VJiUiq8");
}
</style>