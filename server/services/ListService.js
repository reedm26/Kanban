import mongoose from "mongoose";
import List from "../models/List";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("List", List);

class ListService {
  async getListsByBoardId(userId, boardId) {
    let data = await _repository.find({ authorId: userId, boardId: boardId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }

  async create(body) {
    let data = await _repository.create(body);
    return data;
  }
  async edit(boardId, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { boardId: boardId, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }
  async delete(listId, userId) {
    let data = await _repository.findOneAndRemove({
      _id: listId,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Didnt delete", 404);
    }
    return data;
  }
}

const _listService = new ListService();
export default _listService;
