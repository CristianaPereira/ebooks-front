import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export type ActionResult = {
  errors?: ActionErrors;
}

export type ActionErrors = {
  form_errors?: FieldErrors;
}

export type FieldErrors = {
  [x: string]: string | undefined;
}

const handleSubmit = async (_prevState: ActionResult, formData: FormData) => {
  // TODO: use env var
  const response = await axios.post("http://127.0.0.1:8080/api/users", {
    user: {
      name: formData.get('name'),
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
    }
  }).then(() => {
    NotificationManager.success('New account successfully created');
  }).catch((err) => {
    const { form_errors } = err.response.data;
    NotificationManager.error('It was not possible to create the user.');
    return { errors: { form_errors } }
  })
  return response
}


export { handleSubmit };