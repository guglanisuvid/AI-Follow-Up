import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const handleGoogleSignIn = async () => {
    const url = `${import.meta.env.VITE_API_URL}/api/auth/google`;
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to initiate Google sign-in");
    }

    const data = await res.json();
    if (!data.url) {
      throw new Error("No URL returned for Google sign-in");
    }

    window.location.href = data.url;
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-[480px] bg-bg-200 text-center p-8 flex flex-col gap-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-semibold">Welcome to AI Follow-Up</h1>
        <p className="text-text-200 opacity-80">
          Your full-stack AI agent for crafting smart follow-up emails to
          recruiters, clients, hiring managers, and more.
        </p>

        <button
          onClick={handleGoogleSignIn}
          className="relative flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 px-6 py-3 rounded-xl font-semibold text-lg hover:cursor-pointer"
        >
          <span className="absolute left-0 top-0 bottom-0 aspect-square flex items-center justify-center bg-accent-100 rounded-l-xl">
            <FcGoogle size={24} />
          </span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
