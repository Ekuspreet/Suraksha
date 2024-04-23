import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className=" h-full bg-base-300  w-auto m-5 flex flex-col justify-center gap-4 py-5 px-3 rounded-xl">
        <div className="tooltip" data-tip="Upload A File">
          <button class=" btn">
            <span className="material-symbols-outlined text-2xl">
                upload_file
            </span>
          </button>
        </div>
        <div className="tooltip" data-tip="View Templates">
          <button class=" btn">
            <span className="material-symbols-outlined text-2xl">
                developer_guide
            </span>
          </button>
        </div>
        <div className="tooltip" data-tip="Edit Templates">
          <button class=" btn">
            <span className="material-symbols-outlined text-2xl">
                edit
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
