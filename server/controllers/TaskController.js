import _taskService from "../services/TaskService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";
import _commentService from "../services/CommentService";
//PUBLIC
export default class TaskController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("/:id/comments", this.getCommentsByTaskId)
      .post("", this.create)
      .put("/:id/comments/:id", this.editCommentsByTaskId)
      .delete("/:id", this.delete)
      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _taskService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await _taskService.delete(req.params.id, req.session.uid);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
  async getCommentsByTaskId(req, res, next) {
    try {
      let data = await _commentService.getCommentsByTaskId(
        req.session.uid,
        req.params.id
      );
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }
  async editCommentsByTaskId(req, res, next) {
    try {
      let data = await _commentService.edit(
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
