import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../VisualAspects/Icon';

const InviteFriendsButton = ({ t }) => {
    const navigate = useNavigate();

    const handleInvite = () => {
        navigate('/Friends');
    };

    return (
        <button
            className="bg-background/40 backdrop-blur-sm text-button text-xs font-bold w-full py-2 rounded-lg mt-4 border border-button/30 hover:bg-background/60 transition-all flex items-center justify-center"
            onClick={handleInvite}
        >
            <Icon className="mr-1" name="plus" /> {t('inviteFriends')}
        </button>
    );
};

export default InviteFriendsButton;