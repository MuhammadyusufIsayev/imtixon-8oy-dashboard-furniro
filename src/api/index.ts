import axios from 'axios'

export async function SignIn(user){
    try{
        const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/auth', user)
        return response.data
    }catch(error){
        alert(error)
    }
}


export async function SignUp(user){
    try{
        const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/register', user)
        return response.data
    }catch(error){
        alert(error)
    }
}
