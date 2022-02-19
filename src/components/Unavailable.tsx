import React from "react";

type Props = {};

const Unavailable: React.FC<Props> = props => {
  return (
    <div className="flex flex-col">
      <span className="my-1 font-mono font-bold text-center -tracking-wider text-red-400 text-lg">
        Unavailable
      </span>

      <span className="text-center text-medium font-semibold">
        This page is only available at{" "}
        <a
          href="http://https://qalam.nust.edu.pk/survey"
          className="text-gray-400"
        >
          https://qalam.nust.edu.pk/survey/
        </a>
      </span>
    </div>
  );
};

export default Unavailable;
