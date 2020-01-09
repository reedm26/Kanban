<template>
  <div class="board container-fluid">
    <top />
    <div class="row">
      <div class="col-12">
        <h1>{{board.title}}</h1>
        <p>{{board.description}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-3 m-0.5" v-for="list in lists" :key="list._id">
        <list :listData="list" />
      </div>
    </div>
    <div class="row">
      <div class="col-12"></div>
    </div>
  </div>
</template>

<script>
import list from "@/components/List";
import top from "@/components/Top";

export default {
  name: "board",
  mounted() {
    this.$store.dispatch("setActiveBoard", this.$route.params.boardId);
    this.$store.dispatch("getLists", this.$route.params.boardId);
  },
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
  },
  computed: {
    board() {
      return (
        this.$store.state.activeBoard || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  components: {
    list,
    top
  },
  props: ["boardId"]
};
</script>
