import { Spin } from "antd";
const FormCard = ({ headerSection, children, loading = false }) => {
  return (
    <Spin spinning={loading}>
      <div
        className={`
    w-full shadow-2xl  
    dark:shadow-gray-300 
    rounded-md 
    p-[20px] 
    bg-white  
    dark:bg-gray-800`}
      >
        {" "}
        {headerSection}
        {children}
      </div>
    </Spin>
  );
};

export default FormCard;
