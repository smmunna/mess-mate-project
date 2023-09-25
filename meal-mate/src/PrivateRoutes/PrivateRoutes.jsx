import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (!user && loading) {
        return <div>
            <div className="text-center py-24">
                <div>
                    <span className="loading loading-spinner h-16 w-16 text-secondary"></span>
                </div>
            </div>
        </div>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
}

export default PrivateRoutes;