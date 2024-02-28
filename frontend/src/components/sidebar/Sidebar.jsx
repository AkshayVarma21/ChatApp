import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div id="menu" class='border-r border-slate-500 p-4 flex flex-col'>
			<button id="hamburger-btn" class="sm:hidden">&#9776;</button>
			<div id="content" class="hidden sm:block">
				<SearchInput />
				<div class='divider px-3'></div>
				<Conversations />
				<LogoutButton />
			</div>
		</div>

	);
};
export default Sidebar;