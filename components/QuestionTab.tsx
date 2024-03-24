import { SearchParams } from "@/lib/actions/shared.types";
import { getUserQuestions } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "./Cards/QuestionCard";

interface QuestionTabProps {
  searchParams: SearchParams;
  userId: string;
  clerkId?: string | null;
}
const QuestionTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionTabProps) => {
  const result = await getUserQuestions({ userId, page: 1 });

  return (
    <div className="flex flex-col gap-5">
      {result?.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          views={question.views}
          upvotes={question.upvotes}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </div>
  );
};

export default QuestionTab;
