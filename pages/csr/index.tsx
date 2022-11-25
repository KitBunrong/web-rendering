import Link from "next/link";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { Article } from "../../lib/types";

const CSR = () => {
  const [articles, setArticles] = useState<Article[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchArticle = async () => {
      const res = await fetch("/api/csr");
      const articles = await res.json();
      setArticles(articles.articles);
      setLoading(false);
    };
    fetchArticle();
  }, []);
  return (
    <>
      {loading && <>Loading...</>}
      {articles &&
        articles.map((article, index) => (
          <div key={index}>
            <Link href={`/csr/${article.id}`}>{article.title}</Link>
          </div>
        ))}
    </>
  );
};

CSR.getLayout = (page: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined) => {
  return <MainLayout title={"CSR"}>{page}</MainLayout>;
};

export default CSR;
