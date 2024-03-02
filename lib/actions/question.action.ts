"use server";

import { Question } from "@/models/question.model";
import { connectToDatabase } from "../mongoose";
import { Tag } from "@/models/tag.model";
import { CreateQuestionsParams, GetQuestionsParams } from "./shared.types";
import { User } from "@/models/user.model";
import { revalidatePath } from "next/cache";

export async function createQuestion(params: CreateQuestionsParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({ title, content, author });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
    return;
  } catch (error) {
    console.log("ERROR FROM CREATE QUESTION ", error);
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find()
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error: any) {
    console.log("ERROR FROM GET QUESTIONS ", error);
  }
}
