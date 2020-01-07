import mongoose from "mongoose";
import Comment from "../models/Comment";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Comment", Comment);

class CommentService {
  async getCommentsByTaskId(userId, taskId) {
    let data = await _repository.find({ authorId: userId, taskId: taskId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }

  async create(body) {
    let data = await _repository.create(body);
    return data;
  }
  async edit(commentId, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: commentId, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError(
        "From CommentService: Invalid ID or you do not own this board",
        400
      );
    }
    return data;
  }
  async delete(commentId, userId) {
    let data = await _repository.findOneAndDelete({
      _id: commentId,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Didnt delete", 404);
    }
    return data;
  }
}

const _commentService = new CommentService();
export default _commentService;
