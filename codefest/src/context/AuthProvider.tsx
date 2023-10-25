import { createContext, useContext, useState } from "react";

// Context values
interface AuthProviderProps {
    user: string | null
    rol: number
}

// Context init values
const initialAuthProvider: AuthProviderProps = {
    user: null,
    rol: 0
}

// Create Context
const AuthContext = createContext<AuthProviderProps>(initialAuthProvider)

// Provider Type
type AuthProviderType = React.FC<{
    children: React.ReactNode
}>;

export const AuthProvider: AuthProviderType = ({ 
    children
}) => {

    const [user, setUser] = useState<string | null>(null);
    const [rol, setRol] = useState<number>(0);

    return (
        <AuthContext.Provider value={{
            user,
            rol
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// Exports a custom hook
export const useAuth = () => useContext(AuthContext);