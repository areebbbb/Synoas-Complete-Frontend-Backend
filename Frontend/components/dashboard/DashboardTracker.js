import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getApplicationLoginActivity } from "store/feature/Dashboard/DashboardService";
import { Table } from "antd";
import moment from "moment";
const columns = [
  {
    title: "Name",
    dataIndex: "UserID",
    sorter: {
      compare: (a, b) => a.UserID.username.localeCompare(b.chinese),
      multiple: 3,
    },
    render: (text, record) => (record.UserID ? record.UserID.username : ""),
  },
  {
    title: "City Name",
    dataIndex: "CityID",
    sorter: {
      compare: (a, b) => a.CityID.CityName.localeCompare(b.CityID.CityName),
      multiple: 3,
    },
    render: (text, record) => record.CityID.CityName,
  },
  {
    title: "IPAddress",
    dataIndex: "IPAddress",
    sorter: {
      compare: (a, b) => a.IPAddress.localeCompare(b.IPAddress),
      multiple: 2,
    },
  },
  {
    title: "LoginTimestamp",
    dataIndex: "LoginTimestamp",
    render: (text, record) => new moment(text).toString("MM/DD/YYYY HH:mm:ss"),
    sorter: {
      compare: (a, b) =>
        new moment(a.LoginTimestamp) - new moment(b.LoginTimestamp),
      multiple: 2,
    },
  },
];

const DashboardTracker = () => {
  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getApplicationLoginActivity().then((res) => {
      if (!res) return;
      setTableData(res.data.Application_Login_Activities);
      setLoading(false);
    });
  }, []);
  return <Table columns={columns} dataSource={tableData} loading={loading} />;
};

export default DashboardTracker;
