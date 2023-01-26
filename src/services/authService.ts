export function isAuthenticated(){
    const authenticated = localStorage.getItem('authenticated') == "1";
    return authenticated;
}

export function verifyCredentials(userName:string, password: string){
    if(userName == 'admin' && password == '123456' || userName == 'admin1' && password == '555555')
        return true;

    return false;
}

