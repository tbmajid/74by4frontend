import { BsPersonCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

export default function User() {
  const route = useRouter();
  const { user, error, isLoading } = useUser();
  if (!user)
    return (
      <div
        className="pr-2 cursor-pointer"
        onClick={() => route.push(`/api/auth/login`)}
      >
        <BsPersonCircle size={40} />
      </div>
    );
  return (
    <button
      className="cursor-pointer relative border-none bg-transparent"
      onClick={() => route.push(`/profile`)}
    >
      {/* <img src={user.picture} alt={user.name} /> */}
      <div className="text-xs pr-3">
        Hello, {user.name}
        <br />
        <span className="text-sm">Account Dashboard</span>
      </div>
    </button>
  );
}
