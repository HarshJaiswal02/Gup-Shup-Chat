const Header = () => {
  return (
    <>
      <div className="px-5 py-2 flex flex-col sm:flex-row justify-between items-center bg-gray-400 border-b-2">
        <div className="font-semibold text-2xl">
          <span className="text-black">Gup-Shup</span>
        </div>
        <div className="w-full sm:w-1/2 mt-2 sm:mt-0">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search IRL"
            className="rounded-2xl bg-gray-100 py-2 px-4 w-full"
          />
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0 items-center">
          <div role="alert" className="alert flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-7 w-7 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21c-.447-.553-8.473-8.533-9-9.288C2 10.54 2 8.69 2 7.8 2 5.06 4.24 3 6.61 3c1.657 0 3.013.81 3.874 2.037C11.227 3.81 12.583 3 14.24 3 16.61 3 18.85 5.06 18.85 7.8c0 .89 0 2.74-1 3.912-.527.755-8.553 8.735-9 9.288z"
              />
            </svg>
            <div>
              <h3 className="font-bold">New message!</h3>
              <div className="text-xs">You have 1 unread message</div>
            </div>
          </div>
          <div className="avatar online">
            <div className="w-10 sm:w-12 rounded-full">
              <img
                src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
                alt="user avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
