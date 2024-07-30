import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Badge from '@mui/material/Badge';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import { Member } from '../../../types/user';
import { RippleBadge } from '../../MaterialTheme/styled';
import { Scrollbar } from 'swiper';

const NewMessage = (type: any) => {
	if (type === 'right') {
		return (
			<Box
				component={'div'}
				flexDirection={'row'}
				style={{ display: 'flex' }}
				alignItems={'flex-end'}
				justifyContent={'flex-end'}
				sx={{ m: '10px 0px' }}
			>
				<div className={'msg_right'}></div>
			</Box>
		);
	} else {
		return (
			<Box flexDirection={'row'} style={{ display: 'flex' }} sx={{ m: '10px 0px' }} component={'div'}>
				<Avatar alt={'jonik'} src={'/img/profile/defaultUser.svg'} />
				<div className={'msg_left'}></div>
			</Box>
		);
	}
};
interface MessagePayload {
	event: string;
	text: string;
	memberData: Member;
}

interface InfoPayload {
	event: string;
	totalClients: number;
	memeberData: Member;
	action: string;
}

const Chat = () => {
	const chatContentRef = useRef<HTMLDivElement>(null);
	const [messagesList, setMessagesList] = useState<MessagePayload[]>([]);
	const [onlineUsers, setOnlineUsers] = useState<number>(0);
	const [messageInput, setMessageInput] = useState<string>('');
	const [open, setOpen] = useState(false);
	const [openButton, setOpenButton] = useState(false);

	/** LIFECYCLES **/

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setOpenButton(true);
		}, 100);
		return () => clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		setOpenButton(false);
	}, []);

	/** HANDLERS **/
	const handleOpenChat = () => {
		setOpen((prevState) => !prevState);
	};

	const getInputMessageHandler = useCallback(
		(e: any) => {
			const text = e.target.value;
			setMessageInput(text);
		},
		[messageInput],
	);


	return (
		<Stack className="chatting">
			{openButton ? (
				<button className="chat-button" onClick={handleOpenChat}>
					{open ? <CloseFullscreenIcon /> : <MarkChatUnreadIcon />}
				</button>
			) : null}
			<Stack className={`chat-frame ${open ? 'open' : ''}`}>
				<Box className={'chat-top'} component={'div'}>
					<div style={{ fontFamily: 'Nunito' }}>Online Chat</div>
					<RippleBadge style={{ margin: '-18px 0 0 21px' }} badgeContent={onlineUsers} />
				</Box>
				<Box className={'chat-content'} id="chat-content" ref={chatContentRef} component={'div'}>
						<Stack className={'chat-main'}>
							<Box flexDirection={'row'} style={{ display: 'flex' }} sx={{ m: '10px 0px' }} component={'div'}>
								<div className={'welcome'}>Welcome to Live chat!</div>
							</Box>
							{messagesList.map((ele: MessagePayload) => {
								const { text, memberData } = ele;
								return  (
									<Box
										component={'div'}
										flexDirection={'row'}
										style={{ display: 'flex' }}
										alignItems={'flex-end'}
										justifyContent={'flex-end'}
										sx={{ m: '10px 0px' }}
									>
										<div className={'msg-right'}>{text}</div>
									</Box>
								) ; (
									<Box flexDirection={'row'} style={{ display: 'flex' }} sx={{ m: '10px 0px' }} component={'div'}>
										<Avatar alt={'jonik'} />
										<div className={'msg-left'}>asdasd</div>
									</Box>
								);
                                })}
							<></>
						</Stack>
				</Box>
				<Box className={'chat-bott'} component={'div'}>
					<input
						type={'text'}
						name={'message'}
						className={'msg-input'}
						placeholder={'Type message'}
						value={messageInput}
						onChange={getInputMessageHandler}
						
					/>
					<button className={'send-msg-btn'}>
						<SendIcon style={{ color: '#fff' }} />
					</button>
				</Box>
			</Stack>
		</Stack>
	);
};

export default Chat;

function useReactiveVar(userVar: any) {
    throw new Error('Function not implemented.');
}
function useRouter() {
    throw new Error('Function not implemented.');
}

function socketVar(socketVar: any) {
    throw new Error('Function not implemented.');
}

function userVar(userVar: any) {
    throw new Error('Function not implemented.');
}

function sweetErrorAlert(error4: any) {
    throw new Error('Function not implemented.');
}

