"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TypeLoginSchema } from "@/entities/user";
import { ButtonAuth, FieldAuth } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { ThemeToggle } from "../../theme-toggle";
import { useLoginStore } from "../model/login-store";
import { redirect, RedirectType } from "next/navigation";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const { login, isLoading } = useLoginStore();

  const onSubmit = async (data: TypeLoginSchema) => {
    try {
      const resultMessage = await login(data);
      
      alert(resultMessage);

      redirect("/", RedirectType.replace);
    } catch (error) {
      alert(error);
    }

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        `flex flex-col gap-y-[clamp(30px,3vh,40px)] p-10 mx-auto w-[min(100%,550px)] bg-accent-bg shadow-box rounded-xl`,
      )}
    >
      <ThemeToggle />

      <div className="flex flex-col gap-y-2.5 items-center">
        <h2 className="text-[clamp(24px,2.4vw,28px)]">Войти</h2>
        <p className="text-[clamp(12px,1.4vw,14px)]">
          Войдите в свою учетную запись
        </p>
      </div>

      <div className="flex flex-col gap-y-[clamp(30px,3vh,40px)]">
        <FieldAuth
          type="email"
          register={register("email")}
          placeholder="Email"
          error={errors}
          name="email"
        />

        <FieldAuth
          type="password"
          register={register("password")}
          placeholder="Password"
          error={errors}
          name="password"
        />
      </div>

      <ButtonAuth>
        {  isLoading
          ? "Loading..."
          : "Войти"}
      </ButtonAuth>
    </form>
  );
};
