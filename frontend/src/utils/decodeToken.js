import {jwtDecode} from "jwt-decode";

export function decodeToken(token){
    try{
        if(!token) return {status: 400};
        const decoded = jwtDecode(token);
        return {status: 200, user: decoded};
    }
    catch (error){
        return {status: 500};
    }
}