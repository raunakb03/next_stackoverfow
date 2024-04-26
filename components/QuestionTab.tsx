import { SearchParams } from "@/lib/actions/shared.types";
import { getUserQuestions } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "./Cards/QuestionCard";
import Pagination from "./Pagination";

interface QuestionTabProps {
  searchParams: any;
  userId: string;
  clerkId?: string | null;
}
const QuestionTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionTabProps) => {
  const result: any = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="flex flex-col gap-5">
      {result?.questions.map((question: any) => (
        <QuestionCard
          clerkId={clerkId}
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
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result?.isNext}
      />
    </div>
  );
};

export default QuestionTab;
