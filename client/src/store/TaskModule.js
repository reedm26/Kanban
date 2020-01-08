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
    }
  }
};
