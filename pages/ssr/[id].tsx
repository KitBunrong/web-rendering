import { PrismaClient } from "@prisma/client";
import { NextPageWithLayout } from "../page";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import MainLayout from "../../components/MainLayout";

const prisma = new PrismaClient();

const SSRPage: NextPageWithLayout = (article: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string;
  const article = await prisma.article.findUnique({
    where: { id: id },
  });

  if (article) {
    return {
      props: JSON.parse(JSON.stringify(article)),
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

SSRPage.getLayout = (page) => {
  return <MainLayout title="SSR">{page}</MainLayout>;
};

export default SSRPage;
