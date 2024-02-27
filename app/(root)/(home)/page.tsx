import QuestionCard from "@/components/Cards/QuestionCard";
import Filter from "@/components/Filter";
import NoResult from "@/components/NoResult";
import HomeFilters from "@/components/home/HomeFilters";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: "1",
    title: "How to learn TypeScript effectively?",
    tags: [{ _id: "tag1", name: "TypeScript" }, { _id: "tag2", name: "Programming" }],
    author: {
      _id: "author1",
      name: "John Doe",
      picture: "/path/to/picture1.jpg",
    },
    upvotes: 25,
    views: 500000,
    answers: [],
    createdAt: new Date("2023-01-15"),
  },
  {
    _id: "2",
    title: "Best practices for React performance optimization?",
    tags: [{ _id: "tag3", name: "React" }, { _id: "tag4", name: "Performance" }],
    author: {
      _id: "author2",
      name: "Jane Smith",
      picture: "/path/to/picture2.jpg",
    },
    upvotes: 30,
    views: 200,
    answers: [],
    createdAt: new Date("2023-02-20"),
  },
  {
    _id: "3",
    title: "How to deploy a Node.js application to AWS?",
    tags: [{ _id: "tag5", name: "Node.js" }, { _id: "tag6", name: "AWS" }],
    author: {
      _id: "author3",
      name: "Alice Johnson",
      picture: "/path/to/picture3.jpg",
    },
    upvotes: 18,
    views: 120,
    answers: [],
    createdAt: new Date("2023-03-10"),
  },
  {
    _id: "4",
    title: "Understanding asynchronous programming in JavaScript",
    tags: [{ _id: "tag7", name: "JavaScript" }, { _id: "tag8", name: "Asynchronous" }],
    author: {
      _id: "author4",
      name: "Bob Williams",
      picture: "/path/to/picture4.jpg",
    },
    upvotes: 40,
    views: 250,
    answers: [],
    createdAt: new Date("2023-04-05"),
  },
  {
    _id: "5",
    title: "How to design a RESTful API?",
    tags: [{ _id: "tag9", name: "API" }, { _id: "tag10", name: "Design" }],
    author: {
      _id: "author5",
      name: "Eva Brown",
      picture: "/path/to/picture5.jpg",
    },
    upvotes: 35,
    views: 180,
    answers: [],
    createdAt: new Date("2023-05-12"),
  },
  {
    _id: "6",
    title: "Introduction to machine learning algorithms",
    tags: [{ _id: "tag11", name: "Machine Learning" }, { _id: "tag12", name: "Algorithms" }],
    author: {
      _id: "author6",
      name: "Michael Garcia",
      picture: "/path/to/picture6.jpg",
    },
    upvotes: 22,
    views: 160,
    answers: [],
    createdAt: new Date("2023-06-20"),
  },
  {
    _id: "7",
    title: "CSS grid layout tutorial for beginners",
    tags: [{ _id: "tag13", name: "CSS" }, { _id: "tag14", name: "Layout" }],
    author: {
      _id: "author7",
      name: "Olivia Martinez",
      picture: "/path/to/picture7.jpg",
    },
    upvotes: 28,
    views: 190,
    answers: [],
    createdAt: new Date("2023-07-08"),
  },
  {
    _id: "8",
    title: "Using Git effectively in a team environment",
    tags: [{ _id: "tag15", name: "Git" }, { _id: "tag16", name: "Version Control" }],
    author: {
      _id: "author8",
      name: "David Wilson",
      picture: "/path/to/picture8.jpg",
    },
    upvotes: 33,
    views: 220,
    answers: [],
    createdAt: new Date("2023-08-15"),
  },
  {
    _id: "9",
    title: "How to implement authentication in a Node.js app?",
    tags: [{ _id: "tag17", name: "Node.js" }, { _id: "tag18", name: "Authentication" }],
    author: {
      _id: "author9",
      name: "Sophia Taylor",
      picture: "/path/to/picture9.jpg",
    },
    upvotes: 26,
    views: 170,
    answers: [],
    createdAt: new Date("2023-09-30"),
  },
  {
    _id: "10",
    title: "Understanding the basics of Docker containers",
    tags: [{ _id: "tag19", name: "Docker" }, { _id: "tag20", name: "Containers" }],
    author: {
      _id: "author10",
      name: "William Lee",
      picture: "/path/to/picture10.jpg",
    },
    upvotes: 38,
    views: 240,
    answers: [],
    createdAt: new Date("2023-10-25"),
  },
];

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
            <QuestionCard
              key={index}
              _id= {question._id}
              title= {question.title}
              tags= {question.tags}
              author= {question.author}
              upvotes= {question.upvotes}
              views= {question.views}
              answers= {question.answers}
              createdAt= {question.createdAt}
            />
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
