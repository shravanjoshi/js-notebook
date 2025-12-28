import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getNotebooks, deleteNotebook } from '../api/notebookApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
    const { auth, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notebooks, setNotebooks] = useState([]);
    const [notebooksLoading, setNotebooksLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [notebookToDelete, setNotebookToDelete] = useState(null);

    const navigate = useNavigate();
    // console.log('in profile page 3');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/auth/profile');
                setProfile(data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        if (auth.token) {
            fetchProfile();
        }
    }, [auth.token]);

    useEffect(() => {
        const fetchNotebooks = async () => {
            try {
                const data = await getNotebooks();
                setNotebooks(data);
            } catch (error) {
                console.error('Failed to fetch notebooks:', error);
            } finally {
                setNotebooksLoading(false);
            }
        };

        if (auth.token) {
            fetchNotebooks();
        }
    }, [auth.token]);

    const handleNewNotebook = () => {
        navigate('/');
    }

    const handleOpenNotebook = (notebookId) => {
        navigate(`/?notebook=${notebookId}`);
    }

    const handleDeleteNotebook = (e, notebookId, notebookTitle) => {
        e.stopPropagation(); // Prevent opening notebook when clicking delete
        setNotebookToDelete({ id: notebookId, title: notebookTitle });
        setShowDeleteModal(true);
    }

    const confirmDelete = async () => {
        if (!notebookToDelete) return;

        try {
            await deleteNotebook(notebookToDelete.id);
            setNotebooks(notebooks.filter(nb => nb._id !== notebookToDelete.id));
            toast.success('Notebook deleted successfully', {
                duration: 3000,
                position: 'bottom-right',
            });
        } catch (error) {
            console.error('Failed to delete notebook:', error);
            toast.error('Failed to delete notebook', {
                duration: 3000,
                position: 'bottom-right',
            });
        } finally {
            setShowDeleteModal(false);
            setNotebookToDelete(null);
        }
    }

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setNotebookToDelete(null);
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-[#11191f] text-[#bbc6ce] flex items-center justify-center">
                <div className="bg-[#1b2832] p-8 rounded-lg shadow-2xl">
                    <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fede02]"></div>
                        <p className="text-lg">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <nav className="bg-[#11191f] text-[#bbc6ce] text-sm flex space-x-1 items-center sticky top-0 z-50 px-4">
                <div className="logo cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/logo.png" alt="" width={30} />
                </div>
                <div className="ml-auto flex items-center gap-4">
                    {auth.user ? (
                        <>
                            <span className="text-[#bbc6ce]">Welcome, {auth.user.name}</span>
                            <Link
                                to="/profile"
                                className="px-3 py-1 hover:text-[#fede02] rounded cursor-pointer"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1 bg-[#1b2832] hover:bg-[#fede02] hover:text-[#11191f] rounded cursor-pointer transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-3 py-1 hover:text-[#fede02] rounded cursor-pointer"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-3 py-1 bg-[#1b2832] hover:bg-[#fede02] hover:text-[#11191f] rounded cursor-pointer transition-colors"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

            </nav>
            <div className="min-h-screen bg-[#11191f] text-[#bbc6ce] p-6 mt-1.5">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-[#1b2832] rounded-lg shadow-2xl p-8 mb-6">
                        <div className="flex items-center space-x-6">
                            <div className="w-20 h-20 bg-[#fede02] rounded-full flex items-center justify-center">
                                <span className="text-3xl font-bold text-[#11191f]">
                                    {profile?.name?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-[#fede02] mb-2">Profile</h1>
                                <p className="text-[#bbc6ce]/70">Manage your account information</p>
                            </div>
                        </div>
                    </div>

                    {profile ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Personal Information Card */}
                            <div className="bg-[#1b2832] rounded-lg shadow-xl p-6">
                                <h2 className="text-xl font-semibold text-[#fede02] mb-6 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    Personal Information
                                </h2>
                                <div className="space-y-4">

                                    <div className="border-b border-[#bbc6ce]/10 pb-4">
                                        <label className="block text-sm font-medium text-[#bbc6ce]/70 mb-1">
                                            Full Name
                                        </label>
                                        <p className="text-[#bbc6ce] text-lg font-medium">
                                            {profile.name}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#bbc6ce]/70 mb-1">
                                            Email Address
                                        </label>
                                        <p className="text-[#bbc6ce] text-lg">
                                            {profile.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* User's Notebooks Card */}
                            <div className="bg-[#1b2832] rounded-lg shadow-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-[#fede02] flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                        </svg>
                                        My Notebooks
                                        <span className="ml-2 text-sm font-normal text-[#bbc6ce]/70">
                                            ({notebooks.length})
                                        </span>
                                    </h2>
                                    {notebooks.length !== 0 &&
                                        <button
                                            onClick={handleNewNotebook}
                                            className="cursor-pointer bg-[#fede02] text-[#11191f] p-1.5 rounded-lg hover:bg-[#fede02]/90 transition-colors duration-200 flex items-center justify-center"
                                            title="Create New Notebook"
                                        >
                                            Create New
                                            {/* <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg> */}
                                        </button>
                                    }
                                </div>

                                {notebooksLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fede02]"></div>
                                    </div>
                                ) : notebooks.length > 0 ? (
                                    <div className="space-y-3 h-[200px] overflow-y-auto ">
                                        {notebooks.map((notebook) => (
                                            <div
                                                key={notebook._id}
                                                onClick={() => handleOpenNotebook(notebook._id)}
                                                className="bg-[#11191f] p-4 rounded-lg border border-[#bbc6ce]/10 hover:border-[#fede02] transition-colors duration-200 cursor-pointer group"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="text-[#bbc6ce] font-medium group-hover:text-[#fede02] transition-colors">
                                                            {notebook.title}
                                                        </h3>
                                                        {/* <div className="flex items-center space-x-3 mt-2 text-xs text-[#bbc6ce]/60">
                                                        <span className="flex items-center">
                                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                                            </svg>
                                                            {notebook.cells?.length || 0} cells
                                                        </span>
                                                        <span className="flex items-center">
                                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                            </svg>
                                                            {formatDate(notebook.updatedAt)}
                                                        </span>
                                                    </div> */}
                                                        <p className="text-[#bbc6ce]/60 text-xs mt-1">
                                                            Updated {new Date(notebook.updatedAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={(e) => handleDeleteNotebook(e, notebook._id, notebook.title)}
                                                            className="cursor-pointer p-1.5 rounded hover:bg-red-500/20 text-[#bbc6ce]/60 hover:text-red-400 transition-colors duration-200 flex items-center justify-center"
                                                            title="Delete Notebook"
                                                        >
                                                            {/* <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg> */}
                                                            <FontAwesomeIcon icon={faTrash} color="lightgrey" size="sm" />
                                                        </button>
                                                        <svg className="w-5 h-5 text-[#bbc6ce]/40 group-hover:text-[#fede02] transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-[#11191f] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-[#bbc6ce]/40" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                            </svg>
                                        </div>
                                        <p className="text-[#bbc6ce]/70 mb-4">No notebooks yet</p>
                                        <button
                                            onClick={handleNewNotebook}
                                            className="bg-[#fede02] text-[#11191f] py-2 px-4 rounded-lg font-semibold hover:bg-[#fede02]/90 transition-colors duration-200"
                                        >
                                            Create Your First Notebook
                                        </button>
                                    </div>
                                )}
                            </div>


                        </div>
                    ) : (
                        <div className="bg-[#1b2832] rounded-lg shadow-xl p-8 text-center">
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-red-400 mb-2">Profile Error</h3>
                            <p className="text-[#bbc6ce]/70">Could not load profile information. Please try refreshing the page.</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 bg-[#fede02] text-[#11191f] py-2 px-4 rounded-lg font-semibold hover:bg-[#fede02]/90 transition-colors duration-200"
                            >
                                Retry
                            </button>
                        </div>
                    )}
                </div>
                {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                        <div className="bg-[#1b2832] rounded-lg shadow-xl max-w-md w-full mx-4 relative">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-[#fffef9] mb-4 pr-8">
                                    Are you sure you want to delete "{notebookToDelete?.title}"?
                                </h3>


                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        onClick={cancelDelete}
                                        className="px-4 py-2 bg-[#bbc6ce]/10 text-[#bbc6ce] rounded-lg hover:bg-[#bbc6ce]/20 transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="px-4 py-2 bg-[#bbc6ce]/10 text-[#bbc6ce] hover:bg-red-500 hover:text-white rounded-lg  transition-colors duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;