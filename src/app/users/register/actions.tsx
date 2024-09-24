import axios from 'axios';
import { NotificationManager } from 'react-notifications';
const handleSubmit = async (data: FormData) => {
  // TODO: use env var
  const asd = await axios.post("http://127.0.0.1:8080/api/users", {
    user: {
      name: data.get('name'),
      email: data.get('email'),
      username: data.get('username'),
      password: data.get('password'),
    }
  }).then(() => {
    NotificationManager.success('New account successfully created');
  }).catch((err) => {
    const { form_errors } = err.response.data;
    // TODO: handle in form
    NotificationManager.error(`It was not possible to create the user.\n ${Object.keys(form_errors).map((k: string) => `${k}: ${form_errors[k]}`).join('\n- ')}`);
  })
  console.log(asd)
}


export { handleSubmit };