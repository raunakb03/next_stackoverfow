"use server"

import { Question } from "@/models/question.model";
import { connectToDatabase } from "../mongoose";
import { Tag } from "@/models/tag.model";

export async function createQuestion(params: any) {
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

    return;
  } catch (error) {
    console.log("ERROR FROM CREATE QUESTION ", error);
  }
}
