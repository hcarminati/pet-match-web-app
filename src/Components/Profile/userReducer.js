import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    email: null,
    username: null,
    password: null,
    firstName: '',
    lastName: '',
    dob: '',
    role: 'GUEST',
    description: '',
    numUploaded: null,
    numAdded: null,
    numAdopted: null,
};

const userSlice = createSlice({
                                  name: 'user',
                                  initialState,
                                  reducers: {
                                      setUser: (state, action) => {
                                          state._id = action.payload._id;
                                          state.email = action.payload.email;
                                          state.username = action.payload.username;
                                          state.password = action.payload.password;
                                          console.log(action.payload.numUploaded);
                                          state.firstName = action.payload.firstName;
                                          state.lastName = action.payload.lastName;
                                          state.dob = action.payload.dob;
                                          state.role = action.payload.role;
                                          state.description = action.payload.description;
                                          state.numUploaded = action.payload.numUploaded;
                                          state.numAdded = action.payload.numAdded;
                                          state.numAdopted = action.payload.numAdopted;
                                      },
                                      login: (state, action) => {
                                          state._id = action.payload._id;
                                          state.email = action.payload.email;
                                          state.username = action.payload.username;
                                          state.password = action.payload.password;
                                          state.firstName = action.payload.firstName;
                                          state.lastName = action.payload.lastName;
                                          state.dob = action.payload.dob;
                                          state.role = action.payload.role;
                                          state.description = action.payload.description;
                                          state.numUploaded = action.payload.numUploaded;
                                          state.numAdded = action.payload.numAdded;
                                          state.numAdopted = action.payload.numAdopted;
                                      },
                                      logout: (state) => {
                                          state.isLoggedIn = false;
                                          state.email = null;
                                          state.username = null; // Clear user data on logout
                                          state.password = null;
                                          state.role = 'guest'; // Reset user type
                                      },
                                      changePassword: (state, action) => {
                                          if (action.payload.currentPassword !== state.password) {
                                              console.error('Current password is incorrect');
                                              return;
                                          }
                                          state.password = action.payload.newPassword;
                                      },
                                  },
                              });

export const {setUser, login, logout, changePassword} = userSlice.actions;

export default userSlice.reducer;
