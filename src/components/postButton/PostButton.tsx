import React, { useContext } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { Context } from "../../utils/Reducer/AppContext";
export const PostButton: React.FC = () => {
  const randomNumber = Math.floor(Math.random() * 55000)
  const contextData = useContext(Context);
  return (
    <div className="flex justify-center items-center gap-3" >
      {/* <FacebookIcon /> */}
      <span>

        <FacebookShareButton
          quote={
            contextData?.state.gameStatus === "completed"
              ? `Hurray i guessed the today word in ${contextData.state.currentAttempt + 1
              } attempts`
              : "Hey let's see how you can do this"
          }
          hashtag="wordhash"
          url={

            `https://mb2212.vanillanetworks.co.in`
          }
        >
          <FacebookIcon round size={40} />
        </FacebookShareButton>
      </span>
      <span>
        <TwitterShareButton
          title={
            contextData?.state.gameStatus === "completed"

              ? `Hurray i guessed the today word in ${contextData.state.currentAttempt + 1
              } attempts`
              : "Hey let's see how you can do this"
          }
          url={`https://mb2212.vanillanetworks.co.in`}
          hashtags={["wordhash"]}
        >
          <TwitterIcon round size={40} />
        </TwitterShareButton>
      </span>
    </div>
  );
};
