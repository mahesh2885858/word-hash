import { useContext } from "react";
import { Context } from "../../utils/Reducer/AppContext";

const Timer = ({ color, fontSize }: { color: string; fontSize?: string }) => {
  const contextData = useContext(Context);

  return (
    <div className=" font-bold text-xl mb-3 mt-1 " style={{ color, fontSize }}>
      {
        new Date(contextData?.state.nextWordTimer!).getUTCMinutes().toString().padStart(2, "0") + ":" + new Date(contextData?.state.nextWordTimer!).getSeconds().toString().padStart(2, "0")
      }
    </div>
    // <div className=" font-bold text-xl mb-3 mt-1 " style={{ color, fontSize }}>
    //   {contextData?.state.timer.hours! > 9 ? contextData?.state.timer.hours : "0" + contextData?.state.timer.hours}:{contextData?.state.timer.minutes! > 9 ? contextData?.state.timer.minutes : "0" + contextData?.state.timer.minutes}:
    //   {contextData?.state.timer.seconds! > 9 ? contextData?.state.timer.seconds : "0" + contextData?.state.timer.seconds}
    // </div>
  );
};

export default Timer;
