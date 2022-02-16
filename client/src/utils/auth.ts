


// saving token after login
export const login = (data: any) => {
    const { token, role, user_id, name } = data;
    const userObj = { "token": token, "role": role, "user_id": user_id, "name": name }
    localStorage.setItem("user_info", JSON.stringify(userObj));

}

// checking does user have token or not
export const isLogin = () => {
    const user_info = localStorage.getItem("user_info");
    if (user_info)
        if (JSON.parse(user_info).token) {
            return true;
        }

    return false;
}

// removing token after logout
export const logout = () => {
    localStorage.removeItem("user_info");
}

// check is user admin
export const isAdmin = () => {
    const user_info = localStorage.getItem("user_info");
    if (user_info)
        if (JSON.parse(user_info).role === 'Admin') {
            return true;
        }
    return false
}

// check is user agent
export const isTeacher = () => {
    const user_info = localStorage.getItem("user_info");
    if (user_info)
        if (JSON.parse(user_info).role === 'Teacher') {
            return true;
        }
    return false
}

export const isParent = () => {
    const user_info = localStorage.getItem("user_info");
    if (user_info)
        if (JSON.parse(user_info).role === 'Parent') {
            return true;
        }
    return false
}
export const fleetDetails = () => {
    const user_info = localStorage.getItem("user_info");

    if (user_info) {
        if (JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Fleet Details')) {
            return true;
        }
    }
    return false
}

export const payments = () => {
    const user_info = localStorage.getItem("user_info");

    if (user_info) {
        if (JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Payments')) {
            return true;
        }
    }
    return false
}

export const liveOperations = () => {
    const user_info = localStorage.getItem("user_info");

    if (user_info) {
        if (JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Live Operations')) {
            return true;
        }
    }
    return false
}

export const ratings = () => {
    const user_info = localStorage.getItem("user_info");

    if (user_info) {
        if (JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Ratings')) {
            return true;
        }
    }
    return false
}


export const tickets = () => {
    const user_info = localStorage.getItem("user_info");

    if (user_info) {
        if (JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Tickets')) {
            return true;
        }
    }
    return false
}

export const help = () => {
    const user_info = localStorage.getItem("user_info");

    if (user_info) {
        if (JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Help')) {
            return true;
        }
    }
    return false
}