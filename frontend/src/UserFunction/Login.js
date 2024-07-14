import axios from 'axios';


export const login = async User => {
    if (!User.email || !User.password) {
        alert.warn('Please fill in all required fields');
        return;
    }

    try {
        const res = await axios.post('http://localhost:8081/login', {
            email: User.email,
            password: User.password
        });

        localStorage.setItem('token', res.data.token);
        return res;

    } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
            // Display error message from the server response
            alert(err.response.data.message);
        } else {
            // Display a generic error message
            alert('Login failed. Please try again later.');
        }
        throw err;
    }
};


//register

export const register = async  newUser =>{
    
    if (!newUser.username || !newUser.email || !newUser.password || !newUser.role) {
        alert('Please fill in all required fields');
        return;
    }


    console.log(newUser)

    try{
        const res = await axios.post('http://localhost:8081/register', {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            role: newUser.role
        });

        return res;

    }
    catch(err){
        console.log(err);
        if (err.response && err.response.data) {
            // Display error message from the server response
            alert(err.response.data.error);
        } else {
            // Display a generic error message
            alert('Registration failed. Please try again later.');
        }
        throw err;
    }
}