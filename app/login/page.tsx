import { LoginHeader, LoginSection } from "@/components/login";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  user && redirect("/editor/posts");

  return (
    <div className="flex h-screen flex-col">
      <LoginHeader />
      <div className="mx-auto mt-5 flex max-w-md flex-1 items-center justify-center">
        <LoginSection className="rounded-2xl" />
      </div>
    </div>
  );
};

export default LoginPage;
