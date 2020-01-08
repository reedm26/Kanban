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
    async getTasksByListId({ commit, dispatch }, id) {
      let res = await api.get("lists/" + id + "/tasks");
      commit("setResource", { resource: "tasks", data: res.data });
    },
    async addTask({ commit, dispatch }, task) {
      let res = await api.post("tasks", task);
      dispatch("getTasksByListId", task.listId);
    }
  }
};
