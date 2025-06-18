import { Link } from "react-scroll";

export const Sidebar = ({usersid,dashId,messages}) => {
  return (
    <div className="bg-green-800 text-white w-48 h-full p-6
                     z-10 relative md:block hidden  flex-col">
      <ul className="space-y-6 font-semibold text-lg">
        <li>
          <Link
            to={dashId}
            smooth={true}
            duration={500}
            offset={-70}
            className="cursor-pointer hover:text-green-300"
          >
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link
            to={usersid}
            smooth={true}
            duration={500}
            offset={-70}
            className="cursor-pointer hover:text-green-300"
          >
            👥 Users
          </Link>
        </li>
        <li>
          <Link
            to={messages}
            smooth={true}
            duration={500}
            offset={-70}
            className="cursor-pointer hover:text-green-300"
          >
            💬 Messages
          </Link>
        </li>
        <li>
          <Link
            to="settings"
            smooth={true}
            duration={500}
            offset={-70}
            className="cursor-pointer hover:text-green-300"
          >
            ⚙️ Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

