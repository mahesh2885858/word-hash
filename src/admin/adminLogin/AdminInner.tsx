import React from "react";
import AdminContextProvider from "../adminreducer/AdminContext";
import Calender from "../calender/Calender";

const AdminInner: React.FC = () => {
  return (
    <AdminContextProvider>
      <div className=" w-full">
        <Calender />
      </div>
    </AdminContextProvider>
  );
};

export default AdminInner;
