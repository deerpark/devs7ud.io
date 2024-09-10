"use client";

import { sharedLoginConfig } from "@/config/shared";
import { GithubIcon, GoogleIcon, LoadingDots } from "@/icons";
import { createClient } from "@/lib/supabase/client";
import { cn, getUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";

const getLoginRedirectPath = (pathname?: string | null): string => {
  return (
    getUrl() +
    "/auth/callback" + // Required for PKCE authentication.
    "?redirect=" + // Passed to auth/route/callback to redirect after auth
    (pathname ? pathname : "/dashboard")
  );
};

const FormSchema = z.object({
  email: z
    .string({
      required_error: sharedLoginConfig.emailRequiredError,
    })
    .email(),
});

interface LoginSectionProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const LoginSection: React.FC<LoginSectionProps> = ({ className }) => {
  const supabase = createClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [signInGoogleClicked, setSignInGoogleClicked] =
    React.useState<boolean>(false);
  const [signInGithubClicked, setSignInGithubClicked] =
    React.useState<boolean>(false);
  const router = useRouter();
  const currentPathname = usePathname();
  const redirectTo = getLoginRedirectPath(currentPathname);

  async function signInWithGoogle() {
    setSignInGoogleClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          prompt: "consent",
        },
      },
    });
    if (error) {
      toast.error(error.message);
    } else {
      // toast.success(`${data.provider}`);
      //toast.success(data.url);
      // router.refresh();
    }
  }

  async function signInWithGitHub() {
    setSignInGithubClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
        queryParams: {
          prompt: "consent",
        },
      },
    });
    if (error) {
      toast.error(error.message);
    } else {
      // toast.success(`${data.provider}`);
      // toast.success(data.url);
      // router.refresh();
    }
  }

  return (
    <div className={cn("flex flex-col space-y-4 bg-muted/50 p-4", className)}>
      <Button
        variant="outline"
        disabled={signInGoogleClicked}
        className={cn(
          "flex h-10 w-full items-center justify-start space-x-3 rounded-md",
          signInGoogleClicked ? "cursor-not-allowed" : "bg-background",
        )}
        onClick={() => signInWithGoogle()}
      >
        {signInGoogleClicked ? (
          <LoadingDots />
        ) : (
          <>
            <GoogleIcon className="h-5 w-5" />

            <p>{sharedLoginConfig.google}</p>
          </>
        )}
      </Button>

      <Button
        variant="outline"
        disabled={signInGithubClicked}
        className={cn(
          "flex h-10 w-full items-center justify-start space-x-3 rounded-md",
          signInGithubClicked ? "cursor-not-allowed" : "bg-background",
        )}
        onClick={() => signInWithGitHub()}
      >
        {signInGithubClicked ? (
          <LoadingDots />
        ) : (
          <>
            <GithubIcon className="h-5 w-5" />
            <p>{sharedLoginConfig.github}</p>
          </>
        )}
      </Button>
    </div>
  );
};

export default LoginSection;
