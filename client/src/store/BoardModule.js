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
    getBoards({ commit, dispatch }) {
      api.get("boards").then(res => {
        commit("setResource", { resource: "boards", data: res.data });
      });
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post("boards", boardData).then(board => {
        dispatch("getBoards");
      });
    },
    setActiveBoard({ commit, dispatch }, id) {
      api.get("boards/" + id).then(res => {
        commit("setResource", { resource: "activeBoard", data: res.data });
      });
    }
  }
};
