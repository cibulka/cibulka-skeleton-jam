import React, { FC } from 'react';
import { useRouter } from 'next/router';

// TODO: Authentication
const Home: FC = () => {
  const { query, ...router } = useRouter();
  console.log('Q', query, router);
  return <div className="flex flex-col flex-1 items-center justify-center">404 - Not found</div>;
};

export default Home;
