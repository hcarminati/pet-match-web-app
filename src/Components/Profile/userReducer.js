import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    username: null,
    password: null,
    isLoggedIn: false,
    userType: 'guest',
    description: '',
};

const userSlice = createSlice({
                                  name: 'user',
                                  initialState,
                                  reducers: {
                                      setUser: (state, action) => {
                                          state.username = action.payload.username;
                                          state.email = action.payload.email;
                                          state.description = action.payload.description;
                                          state.userType = action.payload.userType;
                                      },
                                      login: (state, action) => {
                                          state.email = action.payload.email;
                                          state.username = action.payload.username;
                                          state.password = action.payload.password;
                                          state.userType = action.payload.userType;
                                          state.description = action.payload.description;
                                          state.isLoggedIn = true;
                                      },
                                      logout: (state) => {
                                          state.isLoggedIn = false;
                                          state.email = null;
                                          state.username = null; // Clear user data on logout
                                          state.password = null;
                                          state.userType = 'guest'; // Reset user type
                                      },
                                      changePassword: (state, action) => {
                                          // Validate current password before changing
                                          if (action.payload.currentPassword !== state.password) {
                                              // Handle error or dispatch an action to indicate an error
                                              console.error('Current password is incorrect');
                                              return;
                                          }

                                          // Update the password
                                          state.password = action.payload.newPassword;
                                      },
                                  },
                              });

export const { setUser, login, logout, changePassword } = userSlice.actions;

export default userSlice.reducer;
