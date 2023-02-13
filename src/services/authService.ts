export function isAuthenticated(){
    const authenticated = localStorage.getItem('authenticated') == "1";
    return authenticated;
}

export function verifyCredentials(userId:string, password: string){
    if(userId == 'admin' && password == '123456' || userId == 'admin1' && password == '555555')
        return true;

    return false;
}

//http://8b38091fc43d.sn.mynetname.net:2000/user/{id}/{senha}