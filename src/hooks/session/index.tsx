import axios from 'axios';
import { createContext, useContext, ReactNode, useReducer, Dispatch, useState } from 'react';

interface Session {
  logged_in: boolean;
  user: {
    name: string;
    email: string;
  };
}
interface CountAction {
  type: ActionTypes;
  payload: Session;
}


const StateContext = createContext<Session | null>(null);
const DispatchContext = createContext<Dispatch<CountAction> | null>(null);

const initialState: Session = {
  logged_in: false,
  user: {
    name: '',
    email: ''
  },
};


enum ActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}
function sessionReducer(state: Session, action: CountAction): Session {
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
function Initializer({ children }: { children: ReactNode}) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { handleLogin } = useSession();
  const fetchWhoAmI = async () => {
    setIsInitialized(true);
    const response = await axios.get("session/logged_in", { withCredentials: true })
      .then((res) => {
        console.log(res); 
        handleLogin(res.data);
        return res.data 
      }).catch((err) => {
        console.log(err);
      });
    return response;
  };

  if(!isInitialized){
    fetchWhoAmI()
    return <div>Loading...</div>
  }
  
return children
}

function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer,  initialState);
 console.log({state})
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
  if (!state || !dispatch ){
    throw new Error('useSession must be used within a SessionProvider');
  }
  const { logged_in, user } = state;

  function handleLogin(session: Session) {
    if (dispatch) {
      dispatch({ type: ActionTypes.LOGIN, payload: session });
    }
  }
  
  return {logged_in , user,  handleLogin};
}
 
export { SessionProvider, useSession };