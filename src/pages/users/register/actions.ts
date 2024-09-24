import { useState } from 'react';

import axios from 'axios';
import { ActionResult, User } from './types';
import showNotification from '../../../components/Notifier';

const handleSubmit = async (formData: User): Promise<ActionResult> => {
  // TODO: use env var
  const response = await axios.post("http://127.0.0.1:8080/api/users", {
    user: formData
  }).then((res) => {
    showNotification({type: 'success', message: 'New account successfully created'});
    return { data: res.data };
  }).catch((err) => {
    showNotification({type: 'error', message: 'It was not possible to create the user.'});
    if (err?.response?.data) {
      const { form_errors } = err.response.data
      return { errors: { form_errors } }
    }
    return { errors: { form_errors: {} } }
  })
  return response

}

function useSubmitRequest() {
  const [state, setState] = useState<ActionResult>({});

  async function sendRequest(formData: User) {
    const res = await handleSubmit(formData)
    setState(res)
  }
  return { state, sendRequest }
}

export { useSubmitRequest };