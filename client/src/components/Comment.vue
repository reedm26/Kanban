<template>
  <div class="comment">
    <div class="text-left" v-for="comment in comments" :key="comment.id">
      <ul>
        <li>
          {{comment.content}}
          <i @click="deleteComment(comment.id)" class="fa fa-close"></i>
        </li>
      </ul>
    </div>
    <form @submit.prevent="addComment">
      <input type="text" placeholder="Add Comment..." v-model="newComment.content" />
      <button class="btn btn-outline-dark text-light bg-dark btn-sm">Add</button>
    </form>
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
  props: ["taskId", "commentData"],
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
    },
    deleteComment(id) {
      if (confirm("Are You Sure You Want To Delete This Comment?")) {
        console.log(id);
        this.$store.dispatch("deleteComment", [id, this.taskId]);
      }
    }
  }
};
</script>

<style>
</style>