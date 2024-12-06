import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    logoutSuccess: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, setUser, setLoading, logoutSuccess } =
  authSlice.actions;

export const login = (result: any) => async (dispatch: any) => {
  try {
    const token = result?.token;
    const user = JSON.stringify(result?.user);
    await localStorage.setItem("@TOKEN", token);
    await localStorage.setItem("@USER", user);
    dispatch(setToken(token));
    dispatch(setUser(JSON.parse(user)));
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    await localStorage.removeItem("@TOKEN");
    await localStorage.removeItem("@USER");
    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const loadUserData = () => async (dispatch: any) => {
  dispatch(setLoading(true));

  try {
    const token = await localStorage.getItem("@TOKEN");
    const user = await localStorage.getItem("@USER");

    if (token && user) {
      dispatch(setToken(token));
      dispatch(setUser(JSON.parse(user)));
    } else {
      console.warn(
        "No se encontraron datos de usuario o token en AsyncStorage"
      );
    }
  } catch (error) {
    console.error(
      "Error al cargar los datos del usuario desde AsyncStorage:",
      error
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
