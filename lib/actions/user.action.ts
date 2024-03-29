"use server";
import { FilterQuery } from "mongoose";
import { IUser, User } from "@/models/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import { Question } from "@/models/question.model";
import { Tag } from "@/models/tag.model";
import { Answer } from "@/models/answer.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log("ERROR FROM GET USER BY ID ", error);
  }
}

export async function createUser(userParams: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userParams);

    return newUser;
  } catch (error: any) {
    console.log("ERROR FROM CREATE USER ", error);
  }
}

export async function updateUser(userParams: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = userParams;
    const newUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error: any) {
    console.log("ERROR FROM UPDATE USER ", error);
  }
}

export async function deleteUser(userParams: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = userParams;

    const user: any = User.findOneAndDelete({ clerkId: clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments ect.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error: any) {
    console.log("ERROR FROM UPDATE USER ", error);
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error: any) {
    console.log("ERROR FROM GET ALL USERS ", error);
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error: any) {
    console.log("ERROR FROM TOGGLE SAVE QUESTION ", error);
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: searchQuery, $options: "i" } }
      : {};

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id name picture" },
      ],
    });

    if (!user) throw new Error("User not found");

    const savedQuestions = user.saved;
    return { questions: savedQuestions };
  } catch (error: any) {
    console.log("ERROR FROM GET SAVED QUESTIONS ", error);
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
  } catch (error: any) {
    console.log("ERROR FROM GET USER INFO ", error);
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id name picture clerkId");

    return { totalQuestions, questions: userQuestions };
  } catch (error: any) {
    console.log("ERROR FROM GET USER QUESTIONS STATS ", error);
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    const userAnswers = await Answer.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id name picture clerkId");

    return { totalAnswers, answers: userAnswers };
  } catch (error: any) {
    console.log("ERROR FROM GET USER ANSWERS STATS ", error);
  }
}
