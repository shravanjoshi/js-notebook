import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-[rgb(17,25,31)] text-[#bbc6ce] flex items-center justify-center">
            <div className="bg-[#1b2832] p-8 rounded-lg shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-16 h-16" />
                    <h2 className="text-3xl font-bold text-[#fede02] mb-2">Welcome Back</h2>
                    <p className="text-[#bbc6ce]/70">Sign in to your account</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address
                        </label>
                        <input 
                            id="email"
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email" 
                            required 
                            className="w-full px-4 py-3 bg-[#11191f] border border-[#bbc6ce]/20 rounded-lg 
                                     text-[#bbc6ce] placeholder-[#bbc6ce]/50 
                                     focus:outline-none focus:border-[#fede02] focus:ring-1 focus:ring-[#fede02]
                                     transition-colors duration-200"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input 
                            id="password"
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter your password" 
                            required 
                            className="w-full px-4 py-3 bg-[#11191f] border border-[#bbc6ce]/20 rounded-lg 
                                     text-[#bbc6ce] placeholder-[#bbc6ce]/50 
                                     focus:outline-none focus:border-[#fede02] focus:ring-1 focus:ring-[#fede02]
                                     transition-colors duration-200"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-[#fede02] text-[#11191f] py-3 px-4 rounded-lg font-semibold
                                 hover:bg-[#fede02]/90 focus:outline-none focus:ring-2 focus:ring-[#fede02] focus:ring-offset-2 focus:ring-offset-[#1b2832]
                                 transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-[#bbc6ce]/70">
                        Don&apos;t have an account?{' '}
                        <a 
                            href="/register" 
                            className="text-[#fede02] hover:text-[#fede02]/80 font-medium transition-colors duration-200"
                        >
                            Create one here
                        </a>
                    </p>
                    <p className="text-[#bbc6ce]/70">
                        Continue without sign in{' '}
                        <a 
                            href="/" 
                            className="text-[#fede02] hover:text-[#fede02]/80 font-medium transition-colors duration-200"
                        >
                            Home
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;