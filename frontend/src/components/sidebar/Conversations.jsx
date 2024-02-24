import useGetConverstions from "../../hooks/useGetConverstaions";
import Conversation from "./Conversation";

const Conversations = () => {

	const { loading, conversations } = useGetConverstions();
	console.log("Con", conversations)
	return (
		<div className='py-2 flex flex-col overflow-auto '>
			{conversations && conversations.map((con, ind) => (
				<Conversation key={con._id} conversation={con} lastInd={ind === conversations.length - 1} />
			))}
			{loading ? <span className="loading loading-spinner"></span> : null}
		</div>
	);
};
export default Conversations;