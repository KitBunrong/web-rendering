import { PrismaClient } from "@prisma/client";
import MainLayout from "../../components/MainLayout";
import { Article } from "../../lib/types";

const prisma = new PrismaClient();

const ISRPage = (article: Article) => {
  return (
    <MainLayout title='ISR'>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
    </MainLayout>
  );
};

export default ISRPage;

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
      props: JSON.parse(JSON.stringify(article)),
      revalidate: 10
    }
    
  }

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}