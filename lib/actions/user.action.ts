"use server";

import { IUser, User } from "@/models/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import { Question } from "@/models/question.model";

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
