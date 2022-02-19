import React from "react";

type Props = {
  text: string;
};

const Footer: React.FC<Props> = props => {
  return (
    <footer className="text-center text-xs text-gray-900 dark:text-gray-400">
      {props.text}
    </footer>
  );
};

export default Footer;
