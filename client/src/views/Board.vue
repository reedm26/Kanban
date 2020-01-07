<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>{{board.title}}</h1>
        <p>{{board.description}}</p>
      </div>
      <list />
      <div class="col-12">
        <form @submit.prevent="addList">
          <input type="text" v-model="newList.title" />
          <button>Add List</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import list from "@/components/List";

export default {
  name: "board",
  mounted() {
    this.$store.dispatch("setActiveBoard", this.$route.params.boardId);
  },
  data() {
    return {
      newList: {
        title: ""
      }
    };
  },
  method: {
    addList() {
      let list = { ...this.newList };
      this.$store.dispatch("addList", list);
      this.newList = {
        title: ""
      };
    }
  },
  computed: {
    board() {
      console.log(this.$store.state.activeBoard);
      return (
        this.$store.state.activeBoard || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return;
    }
  },
  components: {
    list
  },
  props: ["boardId"]
};
</script>
