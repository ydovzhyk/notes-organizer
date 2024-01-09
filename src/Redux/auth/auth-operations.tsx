import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  axiosLogin,
  axiosLogout,
  axiosRegister,
  axiosGetCurrentUser,
} from '../../api/auth';

import { IUserDataRegister, IUserDataLogin } from '../../components/types/auth/auth';
import { IRegistrationResponse, ILoginResponse, ILogoutResponse, IToken, IAuth } from '../../components/types/auth/axios-auth';

export const register = createAsyncThunk(
  'auth/register',
  async (userData: IUserDataRegister, { rejectWithValue }) => {
    try {
        const data: IRegistrationResponse = await axiosRegister(userData);
        return data;
    } catch (error: any) {
        const { data, status } = error.response || {};
        const customError = { data, status };
        return rejectWithValue(customError);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData: IUserDataLogin, { rejectWithValue }) => {
    try {
      const data: ILoginResponse = await axiosLogin(userData);
      const { accessToken, refreshToken, sid } = data;
      const authData = { accessToken, refreshToken, sid };
      localStorage.setItem('notes-organizer.authData', JSON.stringify(authData));
      return data;
    } catch (error: any) {
        const { data, status } = error.response || {};
        const customError = { data, status };
        return rejectWithValue(customError);
        }
    }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const authDataJSON = localStorage.getItem('notes-organizer.authData');
      if (authDataJSON) {
        const authData = JSON.parse(authDataJSON);
        const accessToken: IToken = authData.accessToken;
        const data: ILogoutResponse = await axiosLogout(accessToken);
        localStorage.removeItem('notes-organizer.authData');
        return data;
      }
    } catch (error: any) {
        const { data, status } = error.response || {};
        const customError = { data, status };
        return rejectWithValue(customError);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (_, { rejectWithValue }) => {
    try {
      const authDataJSON = localStorage.getItem('notes-organizer.authData')!;
      const authData = JSON.parse(authDataJSON);
      const accessToken: IToken = authData.accessToken;
      const userData: IAuth = authData;
      const data: ILoginResponse = await axiosGetCurrentUser(userData, accessToken);
      return data;
    } catch (error: any) {
        const { data, status } = error.response || {};
        const customError = { data, status };
        return rejectWithValue(customError);
    }
  }
);