const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const errorHandler = (x) => {
   if (x.type === 'ERROR') {
       x.token !== undefined ? localStorage.setItem('token', x.token) : localStorage.removeItem('token');
       throw { message: x.msg };
    };
    return x;
}

const headers = () => (localStorage.getItem('token') === null || localStorage.getItem('token') === 'undefined')
    ? { 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` };

const testMessage = fetch(`${REACT_APP_API_URL}`, {
    method: 'GET',
    headers
})
    .then(x => x.json())
    .then(x => {
        if (x.token !== undefined) localStorage.setItem('token', x.token);
        return x
    })
    .then(x => errorHandler(x));
  
const reportError = (x) => fetch(`${REACT_APP_API_URL}/tasks/error`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(x)
})
    .then(x => x.json())
    .then(x => {
        if (x.token !== undefined) localStorage.setItem('token', x.token);
        return x
    })
    .then(x => errorHandler(x));

    
export const testService = {
    testMessage,
    reportError
}