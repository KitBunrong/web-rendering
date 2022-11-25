import { PrismaClient } from "@prisma/client";
import { Article } from "../../lib/types";
import Link from "next/link";
import MainLayout from "../../components/MainLayout";

const prisma = new PrismaClient();

const SSG = ({ articles }: { articles: Article[] }) => {
  return (
    <MainLayout title="SSG">
      {articles &&
        articles.map((article, index) => (
          <div key={index}>
            <Link href={`/ssg/${article.id}`}>{article.title}</Link>
          </div>
        ))}
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  const articles = await prisma.article.findMany();

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  };
};

export default SSG;
