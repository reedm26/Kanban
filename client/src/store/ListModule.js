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
    getLists({ commit, dispatch }) {
      api.get("lists").then(res => {
        commit("setResource", { resource: "lists", data: res.data });
      });
    },
    addList({ commit, dispatch }, list) {
      api.post("lists", list).then(list => {
        dispatch("getLists");
      });
    }
  }
};
