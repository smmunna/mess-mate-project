import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null)
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // Google SignIn

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // Logout
    const logOut = () => {
        return signOut(auth)
    }

    // Store the Signin user info
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)

            // For sanctum Implementation
            if (currentUser) {
                const loggedUser = { email: currentUser.email }
                fetch(`https://messmateserver.techzaint.com/api/verify`, { //TODO: change with live server;
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('access-token', data.token)
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }


        })
        return () => {
            return unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        setUser,
        googleSignIn,
        logOut,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
}

export default AuthProvider;
