import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Article } from "../lib/types";
import { NextPageWithLayout } from "./page";
import MainLayout from "../components/MainLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const prisma = new PrismaClient();

const SSR: NextPageWithLayout = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const articles: Article[] = props.articles;
  return (
    <>
      {articles &&
        articles.map((article, index) => (
          <div key={index}>
            <Link href={`/ssg/${article.id}`}>{article.title}</Link>
          </div>
        ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const articles = await prisma.article.findMany();

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  };
};

SSR.getLayout = (page) => {
  return <MainLayout title='SSR'>{page}</MainLayout>;
};

export default SSR;
