import axios from 'axios';

interface LoginForm {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
}

export async function SignIn(user: LoginForm): Promise<AuthResponse> {
    try {
        const response = await axios.post<AuthResponse>('https://ecommerce-backend-fawn-eight.vercel.app/api/auth', user);
        return response.data;
    } catch (error) {
        alert(error);
        throw error;
    }
}

export async function SignUp(user: LoginForm): Promise<AuthResponse> {
    try {
        const response = await axios.post<AuthResponse>('https://ecommerce-backend-fawn-eight.vercel.app/api/register', user);
        return response.data;
    } catch (error) {
        alert(error);
        throw error;
    }
}
