import React from "react";
import classNames from "classnames";
import Link from "next/link";

export const LinkButton = (props) => {
  const { href, className, children, disabled } = props;
  const linkStyle =
    "";

  return (
    <Link
      className={classNames(linkStyle, className, {
        ["pointer-events-none"]: disabled,
      })}
      href={href}
    >
      {children}
    </Link>
  );
};
