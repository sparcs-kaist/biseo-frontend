import { useState, useEffect, useCallback } from 'react';
import axios from '@/utils/axios';
import { MessageType } from '@/common/types';

function useFetch(query: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const sendQuery = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const { data } = await axios
        .get(`/chat/${query}`)
        .catch(() => ({ data: [] }));
      const chatlogs: MessageType[] = data.chats ?? [];

      setHasMore(chatlogs.length > 0);
      setList(prev => prev.concat(chatlogs));
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query]);

  useEffect(() => {
    if (hasMore) sendQuery();
  }, [query]);

  return { loading, list, error };
}

export default useFetch;
