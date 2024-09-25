import { useState } from 'react';

import axios from 'axios';
import { ActionResult, User } from './types';
import showNotification from '../../../components/Notifier';
import { useSession } from '../../../hooks/session';

const handleSubmit = async (formData: User): Promise<ActionResult> => {
  // TODO: use env var
  const response = await axios.post("api/users", {
    user: formData
  },
    { withCredentials: true }
  )
    .then((res) => {
      if (res.data.status === "created") {
        console.log("Registration data", res.data)
      }
      showNotification({ type: 'success', message: 'New account successfully created' });
      return { data: res.data };
    }).catch((err) => {
      showNotification({ type: 'error', message: 'It was not possible to create the user.' });
      if (err?.response?.data) {
        const { record_errors } = err.response.data
        return { errors: { record_errors } }
      }
      return { errors: { record_errors: {} } }
    })
  return response

}

function useSubmitRequest() {
  const {handleLogin} =  useSession()
  const [state, setState] = useState<ActionResult>({});

  async function sendRequest(formData: User) {
    const res = await handleSubmit(formData)
    setState(res)
    handleLogin({logged_in: true, user: res.data})
  }
  return { state, sendRequest }
}

export { useSubmitRequest };