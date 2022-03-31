import { useCallback, useEffect, useState } from "react";
import usePersist from "./usePersist"

export const DEFAULT_PAGE_SIZE = 20;

export const PAGE_SIZE_PERSISTENCE_KEY = 'PAGE_SIZE';
export type PageSizePersistenceKey = typeof PAGE_SIZE_PERSISTENCE_KEY;

const usePageSize = () => {
  const { get: getFromPersistence, set: setAtPersistence } = usePersist();
  const [pageSize, setPageSizeAtState] = useState<number>(DEFAULT_PAGE_SIZE);

  const setPageSize = useCallback((newPageSize: number) => {
    setPageSizeAtState(newPageSize);
    setAtPersistence(PAGE_SIZE_PERSISTENCE_KEY, newPageSize);
  }, []);

  useEffect(() => {
    const previouslyPageSize = getFromPersistence(PAGE_SIZE_PERSISTENCE_KEY) as number | undefined;

    if (previouslyPageSize) {
      setPageSizeAtState(previouslyPageSize);
    }
  }, []);

  return {
    pageSize,
    setPageSize,
  }
};

export default usePageSize;