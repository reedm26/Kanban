import axios from "axios";

let base = window.location.host.includes("localhost")
  ? "//localhost:3000/"
  : "/";

let api = axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default {
  actions: {
    async addComment({ commit, dispatch }, comment) {
      let res = await api.post("comments", comment);
      dispatch("getCommentsByTaskId", comment.taskId);
    },
    async getCommentsByTaskId({ commit, dispatch }, taskId) {
      let res = await api.get("tasks/" + taskId + "/comments");
      commit("setComments", { comments: res.data, taskId: taskId });
    },
    async deleteComment({ commit, dispatch }, idArr) {
      let res = await api.delete("comments/" + idArr[0]);
      dispatch("getCommentsByTaskId", idArr[1]);
    }
  }
};
