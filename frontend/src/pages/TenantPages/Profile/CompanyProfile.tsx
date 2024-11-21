import React, { useState, useRef, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FaUser, FaPencilAlt, FaBell, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { putApiCall, getApiCall } from '../../../services/api-service';
import { InputField } from '../../../common/InputField'
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';

interface UserProfile {
    first_name: string;
    last_name: string;
    email_id: string;
    phone_no: string;
    picture?: string;
}

const CompanyProfile = () => {
    const [activeTab, setActiveTab] = useState<'personal' | 'notification'>('personal');
    const [showEditModal, setShowEditModal] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile>({
        first_name: '',
        last_name: '',
        email_id: '',
        phone_no: ''
    });
    const modalRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const userState = useSelector((state: any) => state.auth.user);

    // Form methods
    const methods = useForm<UserProfile>({
        defaultValues: {
            first_name: '',
            last_name: '',
            email_id: '',
            phone_no: ''
        }
    });

    const loadUserData = async (userId: string) => {
        try {
            const res = await getApiCall(`/users/${userId}`);
            const userData = res.data;
            console.log(userData)

            // Set user profile state
            setUserProfile({
                first_name: userData.first_name,
                last_name: userData.last_name,
                email_id: userData.email_id,
                phone_no: userData.phone_no
            });

            // Reset form with loaded data
            methods.reset({
                first_name: userData.first_name,
                last_name: userData.last_name,
                email_id: userData.email_id,
                phone_no: userData.phone_no
            });
        } catch (err) {
            console.error('Error loading user data:', err);
        }
    };

    useEffect(() => {
        loadUserData(userState.id);
    }, []);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type === "image/png" || file.type === "image/jpeg") {
                const imageUrl = URL.createObjectURL(file);
                setUserProfile(prev => ({ ...prev, profilePicture: imageUrl }));
            } else {
                alert("Please select only PNG or JPG files");
                event.target.value = ''; // Reset input
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                showEditModal && 
                modalRef.current && 
                !modalRef.current.contains(event.target as Node)
            ) {
                setShowEditModal(false);
            }
        };

        // Add event listener when modal is open
        if (showEditModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEditModal]);

    const handleEditPicClick = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (data: UserProfile) => {
        try {
            // Make API call to update user profile
            const response = await putApiCall(`/users/:${userState.id}`, {
                first_name: data.first_name,
                last_name: data.last_name,
                phone_no: data.phone_no
            });

            // Update local state
            setUserProfile(prev => ({
                ...prev,
                firstName: data.first_name,
                lastName: data.last_name,
                mobileNumber: data.phone_no
            }));

            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <>
        <Breadcrumb pageName="Profile Settings" />
        <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark px-5 py-5 md:px-10 md:py-10">
            
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".png,.jpg,.jpeg"
                onChange={handleFileSelect}
            />

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
    <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-28 h-28 bg-slate-700 dark:bg-slate-600 rounded-lg flex items-center justify-center overflow-hidden">
            {userProfile.picture ? (
                <img
                    src={userProfile.picture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            ) : (
                <FaUser size={52} className="text-white" />
            )}
        </div>
        <h2 className="text-2xl font-light text-gray-700 dark:text-white text-center sm:text-left">
            {`${userProfile.first_name} ${userProfile.last_name}`}
        </h2>
    </div>
    <button
        onClick={handleEditPicClick}
        className="px-4 py-2 bg-teal-500 text-white rounded-md flex items-center gap-2 hover:bg-opacity-90 transition-colors"
    >
        <FaPencilAlt size={16} />
        Edit Pics
    </button>
</div>

            {/* Tabs */}
            <div className="border-b border-stroke dark:border-strokedark mb-6">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('personal')}
                        className={`pb-4 px-2 relative ${activeTab === 'personal'
                                ? 'text-teal-500 border-b-2 border-teal-500'
                                : 'text-gray-600 dark:text-gray'
                            }`}
                    >
                        Personal Info
                    </button>
                    <button
                        onClick={() => setActiveTab('notification')}
                        className={`pb-4 px-2 relative ${activeTab === 'notification'
                                ? 'text-teal-500 border-b-2 border-teal-500'
                                : 'text-gray-600 dark:text-gray'
                            }`}
                    >
                        Notification
                    </button>
                </div>
            </div>

            {/* Content */}
            {activeTab === 'personal' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg text-gray-700 dark:text-white">About Me</h3>
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="p-2 bg-teal-500 text-white rounded-md hover:bg-opacity-90 transition-colors"
                        >
                            <FaPencilAlt size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-black font-bold dark:text-white mb-2">First Name</label>
                            <div className="text-gray-800 dark:text-white/60">
                               {userProfile.first_name}
                            </div>
                        </div>
                        <div>
                            <label className="block text-black font-bold dark:text-white mb-2">Last Name</label>
                            <div className="text-gray-800 dark:text-white/60">
                                {userProfile.last_name}
                            </div>
                        </div>
                        <div>
                            <label className="block text-black font-bold dark:text-white mb-2">Email</label>
                            <div className="text-gray-800 dark:text-white/60">{userProfile.email_id}</div>
                        </div>
                        <div>
                            <label className="block text-black font-bold dark:text-white mb-2">Mobile Number</label>
                            <div className="text-gray-800 dark:text-white/60">{userProfile.phone_no}</div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'notification' && (
                <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                        <FaBell size={24} />
                        <p>Notification settings will appear here</p>
                    </div>
                </div>
            )}

            {/* Custom Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white dark:bg-boxdark rounded-lg p-6 w-full max-w-md" ref={modalRef}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Profile Information</h2>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        name="first_name"
                                        label="First Name"
                                        type="text"
                                        required={true}
                                        maxLength={50}
                                    />
                                    <InputField
                                        name="last_name"
                                        label="Last Name"
                                        type="text"
                                        required={true}
                                        maxLength={50}
                                    />
                                </div>

                                <InputField
                                    name="email_id"
                                    label="Email"
                                    type="email"
                                    required={true}
                                    disabled={true}
                                />

                                <InputField
                                    name="phone_no"
                                    label="Mobile Number"
                                    type="text"
                                    required={true}
                                    maxLength={15}
                                />

                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-strokedark rounded-md hover:bg-gray-50 dark:hover:bg-boxdark"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default CompanyProfile;