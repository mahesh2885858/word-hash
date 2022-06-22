import { useContext, useEffect } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Context } from "../../utils/Reducer/AppContext";

const TickerModal: React.FC = () => {
  const data = useContext(Context);
  const isCorrect = data?.state.result;
  const ToastOptions = {
    autoClose: 1000,
    style: {
      borderRadius: "10px",
      // backgroundColor: "",
      boxShadow: "10px 10px 10px #0d0c0ce2",
      width: "fit-content",
      fontWeight: "700",
      color: "#000",
    },
  };
  const notify1 = data?.state.isAValidWord
    ? isCorrect
      ? () => toast.success("You are correct", ToastOptions)
      : () => toast.error("Your guess is wrong", ToastOptions)
    : () => toast.info("Not A Word", { ...ToastOptions });

  useEffect(() => {
    if (
      data?.state.gameStatus === "completed" ||
      data?.state.gameStatus === "over"
    ) {
      return;
    }
    notify1();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="ticker">
      <div>
        <ToastContainer
          className="ticker"
          style={{
            top: "50%",
            left: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translate(-50%,-50%)",
            position: "absolute",
          }}
          transition={Flip}
          position="bottom-center"
        />
      </div>
    </div>
  );
};

export default TickerModal;
