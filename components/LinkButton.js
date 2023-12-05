import React from "react";
import classNames from "classnames";
import Link from "next/link";

export const LinkButton = (props) => {
  const { href, className, children, disabled, testId } = props;
  const linkStyle =
    "h-10 bg-gray-800 text-center flex items-center rounded-md justify-center border-gray-50 border-[1px] border-solid";

  return (
    <Link
      className={classNames(linkStyle, className, {
        ["pointer-events-none"]: disabled,
      })}
      href={href}
      data-test-id={testId}
    >
      {children}
    </Link>
  );
};
