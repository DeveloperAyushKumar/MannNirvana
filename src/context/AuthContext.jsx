import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useContext, useEffect, useState} from 'react'
import { auth } from '../firebase/firebase.config';
import { setLogLevel } from 'firebase/app';
const AuthContext =createContext()
// using pvodier pattern  : https://mortenbarklund.com/blog/react-architecture-provider-pattern/
// custom hook that will be used by child components

 export const useAuth =()=>{
    return useContext(AuthContext);
}

// authProvider  ,
export const AuthProvider =({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    const [loading,setLoading]=useState(true)
    const googleProvider= new GoogleAuthProvider()
    //register
    const registerUser= async(email , password)=>{
        return await createUserWithEmailAndPassword(auth, email , password);
    }  
    // login
    const loginUser= async(email , password)=>{
        return await signInWithEmailAndPassword(auth, email , password);
    }
    // signIn with google 
    const signInWithGoogle=async ()=>{
        return await signInWithPopup(auth ,googleProvider);
    }
    // logout user
    const logout =async()=>{
        return await signOut(auth);
    }
    // manage user 
    useEffect(()=>{
        // onAuthStateChanged return a clean up function to stop listening 

        const unsubscribe =onAuthStateChanged(auth ,(user)=>{
            setCurrentUser(user);
            setLoading(false);
            if(user){
                const {email, displayName, photoURL}=user;
                const userData={
                    email, username:displayName, photo:photoURL                }
            }
        })
        return ()=>unsubscribe();
    },[])

    const value={
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout

    }


    return (
        <AuthContext.Provider value ={value}>
        {children}
        </AuthContext.Provider>
    )
}


