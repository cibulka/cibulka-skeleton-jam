import React, { FC } from 'react';

import Head from 'src/components/head/Head';
import useApiTest from 'src/hooks/testing/useApiTest';

// TODO: Authentication
// Test commit
const Home: FC = () => {
  useApiTest();
  return (
    <>
      <Head />
      <div className="flex flex-col flex-1 items-center justify-center">Hello</div>
    </>
  );
};

export default Home;
