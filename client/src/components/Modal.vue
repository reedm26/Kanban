<template>
  <div class="modal" :id="id" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h4 class="modal-title text-light">{{taskData.description}}</h4>
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body text-dark">
          <div>
            <comment :taskId="taskData.id" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
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
  props: ["taskData", "id"],
  computed: {
    comments() {
      return this.$store.state.comments[this.taskData.id] || [];
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