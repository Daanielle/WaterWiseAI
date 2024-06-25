import React, { useEffect, useState } from 'react';
import { getUserById } from '../../apiRequests';
import { Avatar, Typography, IconButton, Badge } from '@mui/material';
// import { PersonOutline as PersonOutlineIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

export default function MessageHeader({ userId, title, time, numOfComments, isRec }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await getUserById(userId);
                setUser(fetchedUser);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading user</div>;


    return (
        <div style={{ width: '100%', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" style={{ flex: 1, textAlign: 'left', marginRight: '20px' }}>{title}</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    {isRec && <IconButton>
                        <CalculateOutlinedIcon />
                    </IconButton>}
                    <IconButton>
                        {numOfComments != -1 && <Badge badgeContent={numOfComments} sx={{ '& .MuiBadge-badge': { backgroundColor: '#d86018', color: 'white' } }}>
                            <ChatBubbleOutlineRoundedIcon />
                        </Badge>}
                    </IconButton>
                </div>
                <div style={{ marginRight: '10px', marginLeft: '20px' }}>
                    <Typography color="text.secondary" style={{ marginBottom: '5px' }}>
                        {user ? user.firstName + " " + user.lastName : 'Guest'}
                    </Typography>
                    <Typography color="text.secondary">
                        {time}
                    </Typography>
                </div>
                <Avatar src={user ? user.image : null} sx={{ width: 56, height: 56, marginLeft: '10px' }} />
            </div>
        </div>
    );
}
