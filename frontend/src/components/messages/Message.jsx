import { useAuthContext } from "../../context/authContext";
import useConversation from "../../store/useConversation";
import { extractTime } from "../../utils/extractTime";


const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const formattedTime = extractTime(message.createdAt);
	const isLoggedUser = message.senderId === authUser._id;
	const chatClassName = isLoggedUser ? "chat-end" : "chat-start";
	const profilePic = isLoggedUser ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = isLoggedUser ? "bg-blue-500" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Profile pic' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
			<div className='chat-footer text-white opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;