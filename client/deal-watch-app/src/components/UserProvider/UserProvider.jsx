import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { checkUser } from "../../utils/ApiUtils";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState("")

    const handleCheckUser = async () => {
        const checkUserResult = await checkUser()
        if (checkUserResult.loggedin) {
            setUser(checkUserResult.username)
        } else {
            setUser('')
        }
    }
    
    useEffect( () => {
        handleCheckUser()
    }, [])

    return (
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        );
};