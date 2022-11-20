import { PrismaClient } from "@prisma/client";
import MainLayout from "../../components/MainLayout";
import { Article } from "../../lib/types";

const prisma = new PrismaClient();

const SSGPage = (article: Article) => {
  return (
    <MainLayout title='SSG'>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
    </MainLayout>
  );
};

export default SSGPage;

export async function getStaticPaths() {
  const articles = await prisma.article.findMany({ select: { id: true } });
  return {
    paths: articles.map(article => ({
      params: {id: article.id}
    })),
    fallback: true
  };
}

export const getStaticProps = async ({ params }: {params: Article}) =>{
  const article = await prisma.article.findUnique({
    where: {id: params.id}
  })

  if (article) {
    return {
      props: JSON.parse(JSON.stringify(article))
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}