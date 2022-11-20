import Head from "next/head";
import { ReactNode } from "react";

export interface IMainLayout {
  children: ReactNode;
  title: string
}

const MainLayout: React.FC<IMainLayout> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{`${title} | Web Rendering`}</title>
      </Head>
      <div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
