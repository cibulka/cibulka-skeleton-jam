import { useEffect } from 'react';

import { useDispatch } from 'src/store';
import { getApiTestThunk } from 'src/store/app';

export default function useApiTest() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApiTestThunk()).then(console.log);
  }, []);
}
