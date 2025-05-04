/**
 * Represents the user data object.
 */

export interface User {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
}

/**
 * Represents the authentication state.
 * - isAuthenticated: Indicates if the user is authenticated.
 * - accessToken: Stores the authentication token.
 * - user: Stores the user data.
 * - setAuthData: Sets the user and authentication state in the store.
 * - setAccessToken: Sets the access token in the store and local storage.
 * - logout: Clears the authentication state and removes related data from local storage.
 */

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  setAuthData: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
}
