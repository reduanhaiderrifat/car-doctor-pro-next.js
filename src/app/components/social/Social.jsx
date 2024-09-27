import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Social = () => {
  const router = useRouter();
  const { status } = useSession();
  const handleSocialLogin = async (provider) => {
    const result = await signIn(provider, { redirect: false });
    if (status === "authenticated") {
      router.push("/");
    }
  };

  return (
    <div>
      <div className="space-x-8 my-8 flex justify-center">
        <button className="btn hover:bg-transparent bg-transparent hover:border-red-600 ">
          <FaGithub onClick={() => handleSocialLogin("github")} size={24} />
        </button>
        <button className="btn hover:bg-transparent bg-transparent hover:border-red-600 ">
          <FaFacebook size={24} />
        </button>
        <button
          onClick={() => handleSocialLogin("google")}
          className="btn hover:bg-transparent bg-transparent hover:border-red-600 "
        >
          <FcGoogle size={24} />
        </button>
      </div>
    </div>
  );
};

export default Social;
