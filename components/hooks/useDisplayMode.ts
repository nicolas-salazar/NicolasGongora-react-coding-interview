import { useCallback, useEffect, useState } from "react";
import usePersist from "./usePersist"

export const LIST_VIEW_MODE = 'LIST';
export const COLUMNS_VIEW_MODE = 'COLUMNS';
export type ViewMode = typeof LIST_VIEW_MODE | typeof COLUMNS_VIEW_MODE;

export const VIEW_MODE_PERSISTENCE_KEY = 'VIEW_MODE';
export type ViewModePersistenceKey = typeof VIEW_MODE_PERSISTENCE_KEY;

const useDisplayMode = () => {
  const { get: getFromPersistence, set: setAtPersistence } = usePersist();
  const [displayMode, setDisplayModeAtState] = useState<ViewMode>(COLUMNS_VIEW_MODE);

  const setDisplayMode = useCallback((newMode: ViewMode) => {
    setDisplayModeAtState(newMode);
    setAtPersistence(VIEW_MODE_PERSISTENCE_KEY, newMode);
  }, []);

  useEffect(() => {
    const previouslyActiveMode = getFromPersistence(VIEW_MODE_PERSISTENCE_KEY) as ViewMode | undefined;
    if (previouslyActiveMode) {
      setDisplayModeAtState(previouslyActiveMode);
    }
  }, []);

  return {
    displayMode,
    setDisplayMode
  }
};

export default useDisplayMode;