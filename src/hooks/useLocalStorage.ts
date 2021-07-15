import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'src/store';
import { setAuthorizationStoreFromLocalStorage } from 'src/store/authorization';

export default function useLocalStorage(): void {
  const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);
  const dispatch = useDispatch();

  const authorization = useSelector((state) => state.authorization);
  const authorizationStr = JSON.stringify(authorization);

  useEffect(() => {
    if (!window || !window.localStorage) return;
    const authorizationStore = window.localStorage.getItem('authorizationStore');
    if (authorizationStore) dispatch(setAuthorizationStoreFromLocalStorage(authorizationStore));
    setIsLocalStorageLoaded(true);
  }, []);

  useEffect(() => {
    if (!window || !window.localStorage || !isLocalStorageLoaded) return;
    window.localStorage.setItem('authorizationStore', authorizationStr);
  }, [authorizationStr, isLocalStorageLoaded]);
}
