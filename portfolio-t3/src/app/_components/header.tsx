import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <>
      <HeaderItem>
        <Link href="/art">Art</Link>
      </HeaderItem>
      <HeaderItem>
        <Link href="/">
          <h1 className="sm:text-1xl my-2 font-extrabold  tracking-tight sm:text-[1rem] lg:text-2xl lg:text-[3rem]">
            <span className="text-blue-400">Harry </span>Gordenstein
          </h1>
        </Link>
      </HeaderItem>
      <HeaderItem>
        <Link href="/about">About</Link>
      </HeaderItem>
    </>
  );
}

type ItemProps = {
  children: string | JSX.Element | JSX.Element[];
};
function HeaderItem({ children }: ItemProps): JSX.Element {
  return <div className="header-item">{children}</div>;
}
