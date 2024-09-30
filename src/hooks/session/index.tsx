import { createContext, useContext, ReactNode, useReducer, Dispatch, useState, useEffect } from 'react';
import useRequest from '../useRequest';

interface Session {
  logged_in: boolean;
  user?: {
    name: string;
    username: string;
    email: string;
  };
}
interface Action {
  type: ActionTypes;
  payload?: Session;
}


const StateContext = createContext<Session | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

const initialState: Session = {
  logged_in: false,
  user: undefined,
};


enum ActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}
function sessionReducer(state: Session, action: Action): Session {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        ...payload,
      };
    case ActionTypes.LOGOUT:
      // TODO: clear cookies
      return initialState;
    default:
      return state;
  }
}
function Initializer({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { handleLogin } = useSession();
  const { loading, sendRequest } = useRequest();

  const fetchWhoAmI = async () => {
    setIsInitialized(true);
    sendRequest({ method: 'GET', url: 'session/logged_in' }).then((data) => {
      handleLogin(data);
    }).catch(() => {
      console.log('NOT LOGGED');
    });
  };

  useEffect(() => {fetchWhoAmI()}, []);

  if (!isInitialized || loading) {
    return <div>Loading...</div>
  }

  return children
}

function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState);
  
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Initializer>
          {children}
        </Initializer>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );

}



function useSession() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  if (!state || !dispatch) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  const { logged_in, user } = state;

  function handleLogin(session: Session) {
    if (dispatch) {
      dispatch({ type: ActionTypes.LOGIN, payload: session });
    }
  }
  
  function handleLogout() {
    if (dispatch) {
      dispatch({ type: ActionTypes.LOGOUT, payload: undefined });
    }
  }

  return { logged_in, user, handleLogin, handleLogout };
}

export { SessionProvider, useSession };