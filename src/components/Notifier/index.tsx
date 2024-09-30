import { Alert, Snackbar } from "@mui/material";
import { createRoot } from 'react-dom/client'

type MessageType = 'success' | 'error' | 'warning' | 'info'

interface NotifyProps {
  type: MessageType,
  message: string
}
// TODO: improve to allow multiple notifications
const showNotification = ({ type, message }: NotifyProps) => {
  const container = document.createElement('div');
  container.setAttribute("id", "noty");
  document.body.appendChild(container);
  createRoot(document.getElementById('noty')!).render(
    (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={true}
        sx={{ position: 'fixed', zIndex: 1500 }}
      >
        <Alert severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    )
  );

  setTimeout(() => {
    document.body.removeChild(container);
  }, 5000);
};

export default showNotification;

// inpired by : https://dev.to/olabisi09/how-to-build-a-global-notification-system-in-react-4a9n