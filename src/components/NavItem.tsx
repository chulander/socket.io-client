import { forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
export type NavItemType = {
  to: NavLinkProps["to"];
  className?: NavLinkProps["className"];
  children: React.ReactNode;
};

export default NavItem;
export function NavItem({ className, to, children }: NavItemType): JSX.Element {
  return (
    <NavLink className={className} to={to}>
      {children}
    </NavLink>
  );
}

export const NavItemWithRef = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    const { to, children, className } = props;
    return (
      <NavLink ref={ref} to={to} className={className}>
        {children}
      </NavLink>
    );
  }
);

NavItemWithRef.displayName = "NavItemWithRef";
