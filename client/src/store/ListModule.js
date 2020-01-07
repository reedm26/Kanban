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
    async getLists({ commit, dispatch }, id) {
      let res = await api.get("boards/" + id + "/lists");
      commit("setResource", { resource: "lists", data: res.data });
    },
    async addList({ commit, dispatch }, list) {
      console.log(list);
      let res = await api.post("lists", list);
      dispatch("getLists", list.boardId);
    }
  }
};
