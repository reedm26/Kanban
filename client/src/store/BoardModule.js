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
    async getBoards({ commit, dispatch }) {
      let res = await api.get("boards");
      commit("setResource", { resource: "boards", data: res.data });
    },
    async addBoard({ commit, dispatch }, board) {
      let res = await api.post("boards", board);
      dispatch("getBoards");
    },
    async setActiveBoard({ commit, dispatch }, id) {
      let res = await api.get("boards/" + id);
      commit("setResource", { resource: "activeBoard", data: res.data });
    },
    async deleteBoard({ commit, dispatch }, id) {
      let res = await api.delete("boards/" + id);
      dispatch("getBoards");
    }
  }
};
