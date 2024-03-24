import { SearchParams } from "@/lib/actions/shared.types";
import { getUserAnswers } from "@/lib/actions/user.action";
import React from "react";
import AnswerCard from "./Cards/AnswerCard";

interface AnswersTabProps {
  searchParams: SearchParams;
  userId: string;
  clerkId?: string | null;
}
const AnswersTab = async ({
  searchParams,
  userId,
  clerkId,
}: AnswersTabProps) => {
  const result = await getUserAnswers({ userId, page: 1 });

  return (
    <>
      {result?.answers.map((item) => (
        <AnswerCard
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
          author={item.author}
        />
      ))}
    </>
  );
};

export default AnswersTab;
