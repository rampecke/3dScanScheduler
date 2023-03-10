import { FunctionComponent } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

type PageOverlayProps = {
  children: any;
};

export const PageOverlay: FunctionComponent<PageOverlayProps> = ({
  children,
}) => {
  const session = useSession();

  const handleAuthState = () => {
    // When the auth state is loading, we do not want to display anything.
    if (session.status === "loading") return null;
    else if (session.status === "unauthenticated") {
      return (
        <button
          className="text-grey-200  rounded-full p-2  text-center font-semibold"
          onClick={() => signIn()}
        >
          Login
        </button>
      );
    } else if (session.status === "authenticated") {
      return (
        <div>
          <Link
            className="text-grey-200  rounded-full p-2  text-center font-semibold"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <button
            className="text-grey-200  rounded-full p-2  text-center font-semibold"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Abmelden
          </button>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex items-center justify-between py-6 px-4 shadow-md md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/">
            <img className="h-8 w-auto sm:h-10" src="mri.ico" alt="" />
          </Link>
        </div>
        {handleAuthState()}
      </div>
      {children}
    </div>
  );
};
