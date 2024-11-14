import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiService.get('rork/social/my-account')
            .then(res => {
                setUser(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                setUser(null);
                setIsLoading(false);
            });
    }, []);

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
    };
}; 