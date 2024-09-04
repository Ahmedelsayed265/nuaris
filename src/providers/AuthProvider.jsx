import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/authedUser";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./../utils/axiosInstance";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state) => state.authedUser.access_token);

  useEffect(() => {
    if (accessToken) {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      axiosInstance
        .post("/api/v1/web_refresh")
        .then((refresh) => {
          if (refresh.status === 200) {
            const newAccessToken = refresh.data.access_token;
            dispatch(setToken(newAccessToken));
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
          } else {
            dispatch(setToken(null));
            navigate("/login");
          }
        })
        .catch(() => {
          dispatch(setToken(null));
          navigate("/login");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [accessToken, dispatch, navigate]);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refresh = await axiosInstance.post("/api/v1/web_refresh");
            if (refresh.status === 200) {
              const newAccessToken = refresh.data.access_token;
              dispatch(setToken(newAccessToken));
              axiosInstance.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, dispatch]);

  return loading ? null : <>{children}</>;
}
