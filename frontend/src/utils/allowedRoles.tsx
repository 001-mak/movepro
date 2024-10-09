import { useSelector } from 'react-redux';

export const allowedRoles = (roles: string[]) => {
    const user = useSelector((state: any) => state.auth.user);
    return roles.includes(user.user_role);
};