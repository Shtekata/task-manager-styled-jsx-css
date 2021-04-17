const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const errorHandler = (x) => {
    if (x.type === 'ERROR') {
        if (x.msg?.includes('E11000 duplicate key error collection: task-manager.users index: username_1'))
            x.msg = 'Username is already in use!';
        if (x.msg?.includes('E11000 duplicate key error collection: task-manager.users index: email_1'))
            x.msg = 'Email is already in use!';
        x.token !== undefined ? localStorage.setItem('token', x.token) : localStorage.removeItem('token');
        let returnErr = { message: x.msg };
        if (x.username) { returnErr.username = x.username; localStorage.setItem('username', x.username) }
        else localStorage.removeItem('username');
        if (x.userId) { returnErr.userId = x.userId; localStorage.setItem('userId', x.userId) }
        else localStorage.removeItem('userId');
        if (x.email) { returnErr.email = x.email; localStorage.setItem('email', x.email) }
        else localStorage.removeItem('email');
        if (x.photoUrl) { returnErr.photoUrl = x.photoUrl; localStorage.setItem('photoUrl', x.photoUrl) }
        else localStorage.removeItem('email');
        throw returnErr;
    };
    return x;
}

const headers = () => (localStorage.getItem('token') === null || localStorage.getItem('token') === 'undefined')
    ? { 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` };

const register = (x) => fetch(`${REACT_APP_API_URL}/auth/register/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(x)
})
    .then(x => x.json())
    .then(x => {
        if (x.token !== undefined) localStorage.setItem('token', x.token);
        if (x.username !== undefined) { localStorage.setItem('username', x.username) };
        if (x.userId !== undefined) { localStorage.setItem('userId', x.userId) };
        if (x.email !== undefined) { localStorage.setItem('email', x.email) };
        return x
    })
    .then(x => errorHandler(x));

const login = (x) => fetch(`${REACT_APP_API_URL}/auth/login/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(x)
})
    .then(x => x.json())
    .then(x => {
        if (x.token !== undefined) localStorage.setItem('token', x.token);
        if (x.username !== undefined) { localStorage.setItem('username', x.username) };
        if (x.userId !== undefined) { localStorage.setItem('userId', x.userId) };
        if (x.email !== undefined) { localStorage.setItem('email', x.email) };
        if (x.photoUrl !== undefined) { localStorage.setItem('photoUrl', x.photoUrl) };
        return x
    })
    .then(x => errorHandler(x));;

const logout = (x) => fetch(`${REACT_APP_API_URL}/auth/logout`, {
    method: 'GET',
    headers: headers()
})
    .then(x => x.json())
    .then(x => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('photoUrl');
        return x
    })
    .then(x => errorHandler(x));

const getUser = (x) => fetch(`${REACT_APP_API_URL}/auth/${x}`, {
    method: 'GET',
    headers: headers(),
})
    .then(x => {
        return x.json();
    })
    .then(x => {
        if (x.token !== undefined) localStorage.setItem('token', x.token);
        if (x.username !== undefined) { localStorage.setItem('username', x.username) };
        if (x.userId !== undefined) { localStorage.setItem('userId', x.userId) };
        if (x.email !== undefined) { localStorage.setItem('email', x.email) };
        return x;
    })
    .then(x => {
        return errorHandler(x)
    });

const updateUser = ({ _id, x }) => fetch(`${REACT_APP_API_URL}/auth/${_id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(x)
})
    .then(x => {
        return x.json();
    })
    .then(x => {
        if (x.token !== undefined) localStorage.setItem('token', x.token);
        if (x.username !== undefined) { localStorage.setItem('username', x.username) };
        if (x.userId !== undefined) { localStorage.setItem('userId', x.userId) };
        if (x.email !== undefined) { localStorage.setItem('email', x.email) };
        return x;
    })
    .then(x => {
        return errorHandler(x)
    });

export {
    register,
    login,
    logout,
    getUser,
    updateUser
}