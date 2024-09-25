import axios from 'axios';
import { useState } from 'react';


function useRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendRequest = async ({ method, url, payload }: { method: string, url: string, payload?: unknown }) => {
    setLoading(true);
    return await axios({ method, url: url, data: payload, withCredentials: true
    }).then((res) => {
      setData(res.data || {});
      return res.data
    }).catch((error) => {
      // TODO: handle errors
      // not logged
      // etc...
      setError(error);
    }).finally(() => {
      setLoading(false);
    });
  };
  return { loading, error, data, sendRequest };
}

export default useRequest;