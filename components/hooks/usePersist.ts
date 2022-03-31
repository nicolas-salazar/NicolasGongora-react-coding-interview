import { ViewModePersistenceKey } from "./useDisplayMode";
import { PageSizePersistenceKey } from "./usePageSize";

type PersistenceKey = ViewModePersistenceKey | PageSizePersistenceKey;

interface UsePersist {
  get: (key: PersistenceKey) => unknown;
  set: (key: PersistenceKey, data: any) => void;
}

const usePersist = (): UsePersist => {
  const get = (key: PersistenceKey) => {
    return JSON.parse(localStorage.getItem(key));
  }

  const set = (key: PersistenceKey, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  }

  return {
    get,
    set
  }
}

export default usePersist;