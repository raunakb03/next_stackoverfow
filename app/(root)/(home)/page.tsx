import Filter from "@/components/Filter";
import NoResult from "@/components/NoResult";
import HomeFilters from "@/components/home/HomeFilters";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const questions= [
  {
    _id: 1,
    title: "How to use React Router with the latest version of react?",
    tags: [{_id: 1, name: 'react'}, {_id: 2, name: 'javascript'}],
    author: 'John Doe',
    upvotes: 10,
    views: 20,
    answers: 5,
    createdAt: '2021-09-01T00:00:00.000Z'
  },
  {
    _id: 1,
    title: "How to use React Router with the latest version of react?",
    tags: [{_id: 1, name: 'react'}, {_id: 2, name: 'javascript'}],
    author: 'John Doe',
    upvotes: 10,
    views: 20,
    answers: 5,
    createdAt: '2021-09-01T00:00:00.000Z'
  },
]

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href='/ask-questions' className="flex justify-end max-sm:wfull">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">Ask a Question</Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch 
          route='/' 
          iconPosition='left'  
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions'
          otherClasses='flex-1'
        />
        <Filter 
          filters={HomePageFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
          containerClasses='hidden max-md:flex'
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {
          questions.length > 0 ?
          questions.map((question, index)=> (
            'Qustion card'
          )) : 
          <NoResult
            title= "There's no question to show"
            description= "Be the first to beark the silence! Ask a question and kickstart the discussion. Our query coudl be the next big thing others learn from. Get involved!"
            link= '/ask-questions'
            linkText= 'Ask a Question'
          />
        }
      </div>
    </>
  );
};

export default Home;
