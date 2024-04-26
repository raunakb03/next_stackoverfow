import QuestionCard from "@/components/Cards/QuestionCard";
import NoResult from "@/components/NoResult";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import React from "react";

const Page = async ({ params, searchParams }: any) => {
  const result =
    (await getQuestionsByTagId({
      tagId: params.id,
      searchQuery: searchParams.q,
      page: searchParams.page ? +searchParams.page : 1,
    })) || ({} as any);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result?.tagTitle}</h1>
      <div className="mt-11 w-full">
        <LocalSearch
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any, index: any) => (
            <QuestionCard
              key={index}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no saved question to show"
            description="Be the first to beark the silence! Ask a question and kickstart the discussion. Our query coudl be the next big thing others learn from. Get involved!"
            link="/ask-question"
            linkText="Ask a Question"
          />
        )}
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
