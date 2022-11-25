import { NextPageWithLayout } from "../page";
import MainLayout from "../../components/MainLayout";
import { useEffect, useState } from "react";
import { Article } from "../../lib/types";
import { useRouter } from "next/router";

const CSRPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/${id}`);
        const data = await res.json();
        setArticle(data.articles);
        setLoading(false);
      } catch (e) {
        setLoading(false)
        console.log("catch", e);
      }
    };
    fetchArticle();
  }, [id]);
  return (
    <>
      {loading && <>loading...</>}
      {article && (
        <>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </>
      )}
    </>
  );
};

CSRPage.getLayout = (page) => {
  return <MainLayout title="CSR">{page}</MainLayout>;
};

export default CSRPage;
