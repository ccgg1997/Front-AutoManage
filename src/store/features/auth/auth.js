import { createSlice } from "@reduxjs/toolkit";
//import { useState } from "react";

const initialState = {
  token: null,
  usuario: null,
  id:null,
  isAuthenticated: false,
  name: null,
  lastname: null,
  rol: null,
  timeExp: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.usuario = action.payload.usuario;
      state.id = action.payload.id;
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.lastname = action.payload.lastname;
      state.rol = action.payload.rol;
      state.timeExp = action.payload.timeExp;
    },
    clearAuthData: (state) => {
        state.token = null;
        state.usuario = null;
        state.id = null;
        state.isAuthenticated = false;
        state.name = null;
        state.lastname = null;
        state.rol = null;
        state.timeExp = null;
        }   
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;