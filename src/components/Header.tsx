import React from "react";

type Props = {
  title: string;
};

const Header: React.FC<Props> = props => {
  return (
    <h1 className="text-center my-3 text-xl font-semibold">{props.title}</h1>
  );
};

export default Header;
