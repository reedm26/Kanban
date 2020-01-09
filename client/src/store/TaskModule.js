import axios from "axios";

let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default {
  actions: {
    async getTasksByListId({ commit, dispatch }, listId) {
      let res = await api.get("lists/" + listId + "/tasks");
      console.log(res.data);
      commit("setTasks", { tasks: res.data, listId: listId });
    },
    async addTask({ commit, dispatch }, task) {
      let res = await api.post("tasks", task);
      console.log(res.data);
      dispatch("getTasksByListId", task.listId);
    },
    async deleteTask({ commit, dispatch }, idArr) {
      let res = await api.delete("tasks/" + idArr[0]);
      dispatch("getTasksByListId", idArr[1]);
    },
    async editTask({ commit, dispatch }, idArr) {
      let res = await api.put("lists/" + idArr[1] + "/tasks/" + idArr[0], {
        listId: idArr[2]
      });
      dispatch("getTasksByListId", idArr[1]);
      dispatch("getTasksByListId", idArr[2]);
    }
  }
};
