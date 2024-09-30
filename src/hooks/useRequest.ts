import axios from 'axios';
import { useState } from 'react';


type FieldErrors = {
  [x: string]: string[] | undefined;
}

type RequestError = {
  record_errors?: FieldErrors;
}

function useRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<RequestError>();
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
      if (error?.response?.data) {
        setError(error?.response?.data);
      } else {
        setError(error);
      }
    }).finally(() => {
      setLoading(false);
    });
  };
  return { loading, error, data, sendRequest };
}

export default useRequest;