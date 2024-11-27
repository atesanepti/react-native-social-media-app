import { deleteToken, getToken } from "@/helpers/token";
import { ROUTES } from "../constants/apis";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

interface User {
  username: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const client = axios.create({
  baseURL: ROUTES.BASE,
});

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  } as AxiosRequestHeaders,
};

export const createUser = async (user: User) => {
  try {
    const response: ResponseType = await client.post(ROUTES.USER, user, config);
    return {
      ...response.data,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(error);
    }
    return { error: error.message, ok: false };
  }
};

export const login = async (credentials: LoginCredentials) => {
  try {
    const response: ResponseType = await client.post(
      `${ROUTES.AUTH}/login`,
      credentials,
      config
    );
    return {
      ...response.data,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { ...error.response.data };
      }
    }
  }
};

export const protectedRoute = async (token: string) => {
  try {
    const response: ResponseType = await client.get(
      `${ROUTES.AUTH}/protected/${token}`,
      config
    );

    return {
      ...response.data,
    };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return { ...error.response.data };
      } else {
        return { error: "Network error", ok: false };
      }
    }
  }
};

export const logoutApi = async () => {
  try {
    const isLoggedOut = await deleteToken("credential");
    if (isLoggedOut) {
      return { ok: true, message: "User Login Out Successfully" };
    }
    throw Error;
  } catch (error) {
    return { ok: false, error: "Logout failed" };
  }
};

export const fetchMine = async () => {
  try {
    const token = await getToken("credential");
    const response = await client.get(`${ROUTES.USER}/mine`, {
      headers: { ...config.headers, Authorization: `${token}` },
    });
    return { ...response.data };
  } catch (error: any) {
    if (error.response) {
      return { ok: false, error: error.response.data.error };
    }
    return { ok: false, error: "Fetching Failed!" };
  }
};

export const updateUserApi = async (payload: any) => {
  try {
    const token = await getToken("credential");
    const res = await fetch(`${ROUTES.BASE}/${ROUTES.USER}/mine`, {
      method: "PUT",
      body: payload,
      headers: {
        Authorization: `${token}`,
      },
    });
    const user = await res.json();

    if (!user.ok) {
      return { ok: false, error: user.error };
    } else {
      return user;
    }
  } catch (error: any) {
   
    return { ok: false, error: error.message };
  }
};
