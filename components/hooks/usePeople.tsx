import { useCallback, useState } from 'react';

import APIClient from '../../services/APIClient';
import { usePeopleContext } from '../contexts/People.context';

export const usePeople = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const peopleData = usePeopleContext();

  // The following hook (useCallback) may not be neccesary
  // just showing a possible use case
  const execute = useCallback(
    async (size = 20) => {
      setLoading(true);
      try {
        const { data, totalItems } = await APIClient.getPeopleInfo({
          quantity: size,
          page: currentPage,
        });

        setCurrentPage(currentPage + 1);
        if (peopleData.initialized) peopleData.append(data, totalItems);
        else peopleData.initialize(data, totalItems);
      } catch (err) {
        setCurrentPage(0);
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [peopleData.initialize]
  );

  return { ...peopleData, execute, error, loading };
};
