import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { ActionResult } from './types';

const handleSubmit = async (_prevState: ActionResult, formData: FormData): Promise<ActionResult> => {
  // TODO: use env var
  const response = await axios.post("http://127.0.0.1:8080/api/users", {
    user: {
      name: formData.get('name'),
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
    }
  }).then((res) => {
    NotificationManager.success('New account successfully created');
    return {data: res.data} ;
  }).catch((err) => {
    // TODO: handle other errors
    const { form_errors } = err?.response?.data 
    NotificationManager.error('It was not possible to create the user.');
    return { errors: { form_errors } }  
  })
  return response

}


export { handleSubmit };