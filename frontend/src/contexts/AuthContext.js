import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);

  const signIn = async (username, password) => {
    const login = await fetch("http://localhost:4008/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!login.ok) {
      const error = await login.json();
      throw new Error(error.message || "Erreur lors de la connexion");
    }

    const { token } = await login.json();

    console.log(token);

    setIsLogged(true);
    setToken(token);
  };

  const logout = () => setIsLogged(false);

  return (
    <AuthContext.Provider value={{ isLogged, token, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
