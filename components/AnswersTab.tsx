import { SearchParams } from "@/lib/actions/shared.types";
import { getUserAnswers } from "@/lib/actions/user.action";
import React from "react";
import AnswerCard from "./Cards/AnswerCard";
import Pagination from "./Pagination";

interface AnswersTabProps {
  searchParams: any;
  userId: string;
  clerkId?: string | null;
}
const AnswersTab = async ({
  searchParams,
  userId,
  clerkId,
}: AnswersTabProps) => {
  const result: any = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result?.answers.map((item: any) => (
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
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result?.isNext}
      />
    </>
  );
};

export default AnswersTab;
