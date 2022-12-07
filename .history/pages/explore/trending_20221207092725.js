import Head from 'next/head';
import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";
import CommentModal from "../../components/CommentModal";
import Trending from "../../components/Trending";
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useRouter } from "next/router";

export default function Trending({ newsResults, randomUsersResults, trendingResults } ) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Trending Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen mx-auto ">
        {/*Sidebar*/}
        <Sidebar/>

        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex items-center py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="hoverEffect" onClick={() => router.push("/")}>
                            <ArrowLeftIcon className="h-5" />
                        </div>
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
         Explore</h2>

      </div>
      
      <Trending trendingResults={trendingResults.articles}/>
    </div>


 
        <CommentModal/>
        </main>
    </div>
  )
}
//https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function getServerSideProps() {


  const trendingResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
    //"https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  ).then((res) => res.json());


 const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());
  // Who to follow section

  let randomUsersResults = [];

  try {
    const res = await fetch(
      "https://randomuser.me/api/?results=30&inc=name,login,picture"
    );

    randomUsersResults = await res.json();
  } catch (e) {
    randomUsersResults = [];
  }

  return {
    props: {
      newsResults,
      randomUsersResults,
      trendingResults,
    },
  };
}