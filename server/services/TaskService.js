import mongoose from "mongoose";
import Task from "../models/Task";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Task", Task);

class TaskService {
  async getTasksByListId(userId, listId) {
    let data = await _repository.find({ authorId: userId, listId: listId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }

  async create(body) {
    let data = await _repository.create(body);
    return data;
  }
  async edit(taskId, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: taskId, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError(
        "From TaskService: Invalid ID or you do not own this board",
        400
      );
    }
    return data;
  }
  async delete(taskId, userId) {
    let data = await _repository.findOneAndDelete({
      _id: taskId,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Didnt delete", 404);
    }
    return data;
  }
}

const _taskService = new TaskService();
export default _taskService;
