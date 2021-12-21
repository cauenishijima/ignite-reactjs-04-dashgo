import Link, {LinkProps} from "next/link";
import { useRouter } from "next/router";
import { cloneElement } from "react";
import { ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement,
  exact?: boolean,
}

export function ActiveLink({children, exact = false, ...rest}: ActiveLinkProps) {
  const router = useRouter();
  const {asPath} = router;

  const isActive = exact ? 
    (router.asPath === rest.href || router.asPath === rest.as) : 
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)));

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  )
}