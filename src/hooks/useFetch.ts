import { useState, useEffect, useCallback } from 'react';
import axios from '@/utils/axios';
import { MessageType } from '@/common/types';

function useFetch(query: string, page: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const { data } = await axios
        .get(`/chat/${query}`)
        .catch(() => ({ data: [] }));
      const chatlogs: MessageType[] = data.chats ?? [];

      setList(prev => prev.concat(chatlogs));
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [query, sendQuery, page]);

  return { loading, list, error };
}

export default useFetch;
