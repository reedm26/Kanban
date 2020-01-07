import _listService from "../services/ListService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";
import _taskService from "../services/TaskService";

//PUBLIC
export default class ListController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("/:id/tasks", this.getTasksByListId)
      .post("", this.create)
      .put("/:id/tasks/:id", this.editTaskByListId)
      .delete("/:id", this.delete)
      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _listService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await _listService.delete(req.params.id, req.session.uid);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
  async getTasksByListId(req, res, next) {
    try {
      let data = await _taskService.getTasksByListId(
        req.session.uid,
        req.params.id
      );
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }
  async editTaskByListId(req, res, next) {
    try {
      let data = await _taskService.edit(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
