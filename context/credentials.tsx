import { deleteToken, getToken } from "@/helpers/token";
import { isLoaded, isLoading } from "expo-font";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { protectedRoute } from "@/queries/userQueries";
const credentialContext = createContext(null);

export const useCredential = () => useContext(credentialContext);

interface Data {
  id: string;
  username: string;
  email: string;
}
interface Credentials {
  isLoading: boolean;
  data: Data | null;
  error: string | null;
}

export const CredentialProvider = ({ children }) => {
  const initialstate: Credentials = {
    isLoading: false,
    data: null,
    error: null,
  };
  const [token, setToken] = useState("");
  const reducer = (state, action) => {
    if (action.type == "loading") {
      return { ...state, isLoading: action.value };
    } else if (action.type == "set") {
      return { isLoading: false, error: null, data: action.value };
    } else if (action.type == "error") {
      return { ...state, error: action.value.error, isLoading: false };
    } else if (action.type == "success") {
      return { ...state, data: action.value.data, isLoading: false };
    } else if (action.type == "empty") {
      return {};
    }
    return state;
  };

  const setCredential = (user: Data) => {
    dispatch({ type: "set", value: user });
  };

  const logout = () => {
    dispatch({ type: "empty" });
  };

  useEffect(() => {
    const fetchToken = async () => {
      const authToken = await getToken("credential");

      if (authToken) {
        setToken(authToken);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {

    if (token) {
      dispatch({ value: true, type: "loading" });

      protectedRoute(token).then(async(response) => {
        if (!response.ok) {
          await deleteToken("credential")
          dispatch({ type: "error", value: { error: response.error } });
        }
        dispatch({ type: "success", value: { data: response.user } });
      });
    } else {
      dispatch({ type: "empty" });
    }
  }, [token]);

  const [state, dispatch] = useReducer(reducer, initialstate);


  return (
    <credentialContext.Provider value={{ state, setCredential, logout }}>
      {children}
    </credentialContext.Provider>
  );
};
