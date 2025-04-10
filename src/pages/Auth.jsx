import { GoogleLogin } from '@react-oauth/google';
// import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { googleAuth, login, register } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [mode, setMode] = useState('login');
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (mode === 'login') {
                const res = await login(formData);
                if (res.status === 200) {
                    const { name, token } = res?.data;
                    alert(res?.data?.message || 'Login successful');
                    localStorage.setItem("name", name);
                    localStorage.setItem("token", token);
                    navigate('/layout');
                } else {
                    alert(res?.data?.message || 'Login failed');
                    console.error('Login error:', res);
                }
            } else {
                const res = await register(formData);
                if (res.status === 201) {
                    alert(res?.data?.message || 'Registration successful');
                    setMode("login");
                } else {
                    alert(res?.data?.message || 'Registration failed');
                    console.error('Registration error:', res);
                }
            }
        } catch (error) {
            alert(error?.response?.data?.message || 'Something went wrong. Please try again later.');
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setMode(prev => (prev === 'login' ? 'register' : 'login'));
    };

    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
                <div className="text-lg font-medium text-gray-600">Loading...</div>
            </div>
        );
    }
    

    return (
        <div className='w-screen h-screen flex justify-center items-center bg-gray-100'>
            <div className='bg-white p-5 rounded-2xl shadow-md w-full max-w-sm'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>
                    {mode === 'login' ? 'Login with Email' : 'Register an Account'}
                </h2>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {mode === 'register' && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        {mode === 'login' ? 'Login' : 'Register'}
                    </button>
                </form>

                <div className='my-6 border-t text-center text-gray-500'>OR</div>

                <div className='flex justify-center'>
                    <GoogleLogin
                        // const decoded = jwtDecode(credentialResponse.credential);
                        // console.log("Google Login Success:", decoded);

                        onSuccess={async credentialResponse => {
                            setLoading(true);
                            try {
                                const res = await googleAuth(credentialResponse.credential);
                                if (res.status === 200) {
                                    const { name, token } = res?.data;
                                    alert("Google auth Success");
                                    localStorage.setItem("name", name);
                                    localStorage.setItem("token", token);
                                    navigate('/layout');
                                }
                            } catch (error) {
                                alert("Google auth error");
                                console.error("Google auth error:", error);
                            } finally {
                                setLoading(false);
                            }
                        }}                        
                    />
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    {mode === 'login' ? (
                        <>
                            Don't have an account?{' '}
                            <button onClick={toggleMode} className="text-blue-500 hover:underline">
                                Register
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button onClick={toggleMode} className="text-blue-500 hover:underline">
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Auth;
