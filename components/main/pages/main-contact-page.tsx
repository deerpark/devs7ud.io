"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mainPageContactConfig } from "@/config/main/pages";
import { contactFormSchema } from "@/lib/validation/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 as SpinnerIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: Partial<ContactFormValues> = {
  name: "",
  email: "",
  message: "",
};

const MainContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  async function onSubmit(data: ContactFormValues) {
    try {
      setIsLoading(true);
      // Send email using Nodemailer
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      setIsLoading(false);
      form.reset();

      if (!response?.ok) {
        return toast.error(mainPageContactConfig.error);
      }
    } catch (error) {
      // Handle error
      console.error(mainPageContactConfig.error, error);
    } finally {
      setIsLoading(false);
      toast.success(mainPageContactConfig.emailSent);
    }
  }
  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Contact us
        </h2>
        <p className="mt-2 text-lg leading-8">
          Get in touch with us anytime, through email.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto my-10 space-y-4 text-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">{mainPageContactConfig.name}</FormLabel>
                <div className="mx-auto flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">
                  {mainPageContactConfig.email}
                </FormLabel>
                <div className="mx-auto flex w-full max-w-md space-x-2">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">
                  {mainPageContactConfig.message}
                </FormLabel>
                <div className="mx-auto flex w-full max-w-md space-x-2 bg-background">
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className=" text-shadow-md to-accent-/50 hover:to-accent-/50 w-full max-w-sm items-center justify-center rounded-lg bg-foreground/50 bg-gradient-to-t from-border via-accent px-3 py-2 text-sm shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-border hover:via-accent active:scale-[96%] active:ring-black/20"
          >
            {isLoading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
            {mainPageContactConfig.send}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default MainContactPage;
