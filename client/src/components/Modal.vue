<template>
  <div class="modal" :id="'modalComment'+taskData.id" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark">{{taskData.description}}</h5>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <comment v-for="comment in comments" :key="comment.id" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import comment from "@/components/Comment";

export default {
  name: "modalComment",
  mounted() {
    this.$store.dispatch("getCommentsByTaskId", this.taskData.id);
  },
  data() {
    return {};
  },
  props: ["taskData"],
  computed: {
    comments() {
      return this.$store.state.comments;
    }
  },
  methods: {},
  components: {
    comment
  }
};
</script>


<style scoped>
</style>