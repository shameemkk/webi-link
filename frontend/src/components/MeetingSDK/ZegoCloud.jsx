import { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';

const ZegoCloud = ({ roomID, userName, initialRole }) => {
    const meetingRef = useRef(null);
    const navigate = useNavigate();
    const [role, setRole] = useState(initialRole);
    const zegoRef = useRef(null);

    const cleanupMediaDevices = async () => {
        try {
           
            const streams = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            streams.getTracks().forEach(track => {
                track.stop();
            });
        } catch (err) {
            console.log('No media streams to cleanup');
        }
    };

    useEffect(() => {
        const initMeeting = async () => {
            const appID = import.meta.env.VITE_ZEGO_APP_ID;
            const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET ;
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomID,
                Date.now().toString(),
                userName || "User"
            );

            const zc = ZegoUIKitPrebuilt.create(kitToken);
            zegoRef.current = zc;

            // Define role-specific permissions
            const roleConfig = {
                Host: {
                    turnOffCameraWhenJoin: false,
                    turnOffMicrophoneWhenJoin: false,
                    canControlMic: true,
                    canControlCamera: true,
                    canScreenSharing: true,
                    canRemoveUser: true,
                    canMuteAll: true,
                },
                Cohost: {
                    turnOffCameraWhenJoin: false,
                    turnOffMicrophoneWhenJoin: false,
                    canControlMic: true,
                    canControlCamera: true,
                    canScreenSharing: true,
                    canRemoveUser: false,
                    canMuteAll: false,
                },
                Participant: {
                    turnOffCameraWhenJoin: true,
                    turnOffMicrophoneWhenJoin: true,
                    canControlMic: true,
                    canControlCamera: true,
                    canScreenSharing: false,
                    canRemoveUser: false,
                    canMuteAll: false,
                }
            };

            zc.joinRoom({
                container: meetingRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                    config: {
                        role: role,
                        maxUsers: 50,
                        ...roleConfig[role]
                    }
                },
                showScreenSharingButton: roleConfig[role].canScreenSharing,
                showUserList: true,
                layout: 'Grid',
                onUserJoin: (users) => {
                    console.log('Users joined:', users);
                },
                onUserLeave: (users) => {
                    console.log('Users left:', users);
                },
                onHostChange: (newHost) => {
                    if (newHost.userID === userName) {
                        setRole('Host');
                    }
                },
                onLeaveRoom: async () => {
                    console.log('Leaving room...');
                    navigate(`/leaving/${roomID}`);
                },
                sharedLinks: [],
                // Role-specific controls
                turnOnCameraWhenJoining: !roleConfig[role].turnOffCameraWhenJoin,
                turnOnMicrophoneWhenJoining: !roleConfig[role].turnOffMicrophoneWhenJoin,
                showMyCameraToggleButton: roleConfig[role].canControlCamera,
                showMyMicrophoneToggleButton: roleConfig[role].canControlMic,
                showRemoveUserButton: roleConfig[role].canRemoveUser,
                showNonVideoUser: true,
                showOnlyAudioUser: true,
                // Additional meeting controls
                branding: {
                    logoURL: '', // Add your logo URL if needed
                },
                videoResolutionDefault: 'HD',
                useFrontFacingCamera: true,
                onError: (error) => {
                    console.error('ZegoCloud Error:', error);
                }
            });
        };

        initMeeting();

        // Cleanup function
        return () => {
            cleanupMediaDevices();
            if (zegoRef.current) {
                zegoRef.current.destroy();
            }
        };
    }, [roomID, userName, navigate, role]);

    return (
        <div 
            ref={meetingRef}
            style={{ width: '100vw', height: '100vh' }}
        />
    );
};

export default ZegoCloud;