"use server";

import { Answer } from "@/models/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { Question } from "@/models/question.model";
import { revalidatePath } from "next/cache";
import { Interaction } from "@/models/interaction.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    console.log("ERROR FROM CREATE ANSWER: ", error);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId, sortBy, page } = params;

    let sortOptions = {};

    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort(sortOptions);

    return { answers };
  } catch (error: any) {
    console.log("ERROR FROM GET ANSWER: ", error);
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, hasdownVoted, hasupVoted, path, userId } = params;

    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    console.log(updateQuery);

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    revalidatePath(path);
  } catch (error: any) {
    console.log("ERROR FROM UPVOTE ANSWER ", error);
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, hasdownVoted, hasupVoted, path, userId } = params;

    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    revalidatePath(path);
  } catch (error: any) {
    console.log("ERROR FROM DOWNVOTE ANSWER", error);
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDatabase();

    const { answerId, path } = params;
    const answer = await Answer.findById(answerId);
    if (!answer) {
      throw new Error("Answer not found");
    }
    await Answer.deleteOne({ _id: answerId });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answer: answerId });
    revalidatePath(path);
  } catch (error: any) {
    console.log("ERROR FROM DELETE QUESTION ", error);
  }
}
