<template>
  <div class="comment">
    hello
    <form @submit.prevent="addComment">
      <input type="text" placeholder="Add Comment..." v-model="newComment.content" />
      <button class="btn btn-outline-dark btn-sm">Add</button>
    </form>
    <div v-for="comment in comments" :key="comment.id">{{comment.content}}</div>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      newComment: {
        content: "",
        taskId: this.taskId
      }
    };
  },
  mounted() {
    this.$store.dispatch("getCommentsByTaskId", this.taskId);
    console.log(this.taskId);
  },
  props: ["taskId"],
  computed: {
    comments() {
      return this.$store.state.comments[this.taskId] || [];
    }
  },
  methods: {
    addComment() {
      let comment = { ...this.newComment };
      this.$store.dispatch("addComment", comment);
      this.newComment = {
        content: "",
        taskId: this.taskId
      };
    }
  }
};
</script>

<style>
</style>