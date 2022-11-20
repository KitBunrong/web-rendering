import { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';

// export NextPageWithLayout and extends existing NextPage
export type NextPageWithLayout<P = {}> = NextPage<P> & {
  // add getLayout function
  getLayout?: (_page: ReactElement) => ReactNode;
  // and layout ComponentType
  layout?: ComponentType;
};
