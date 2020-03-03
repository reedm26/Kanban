import axios from "axios";

let base = window.location.host.includes("localhost")
  ? "//localhost:3000/"
  : "";

let api = axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});
let imgApi = axios.create({
  baseURL:
    "//api.unsplash.com/photos/random/?client_id=i9iKIFediPEI-GhPSNZXu9-YAPNfSi4ZGx67VJiUiq8",
  timeout: 8000
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
    },
    async getImage({ commit, dispatch }) {
      let res = await imgApi.get("");
      commit("getApiImage", res.data.urls.full);
    }
  }
};
