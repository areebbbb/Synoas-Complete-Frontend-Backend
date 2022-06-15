import React from "react";

const TopBarCard = ({ children }) => {
  return (
    <div className="flex align-middle border border-gray-500 dark:border-gray-300 p-2 min-h-full min-w-full rounded-xl">
      <h4 className="text-sm dark:text-white m-auto">{children}</h4>
    </div>
  );
};

export default TopBarCard;
