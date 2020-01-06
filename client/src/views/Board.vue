<template>
  <div class="board">
    {{board.title}}
    <form @submit.prevent="addList">
      <input type="text" v-model="newList.title" />
      <button>Add List</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "board",
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
      return (
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    }
  },
  props: ["boardId"]
};
</script>
