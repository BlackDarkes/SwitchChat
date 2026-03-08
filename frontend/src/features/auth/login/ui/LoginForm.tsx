/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TypeLoginSchema } from "@/entities/user";
import { ButtonAuth, FieldAuth } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { ThemeToggle } from "../../../theme-toggle";
import { useLoginStore } from "../../model/login-store";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TypeLoginSchema>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login, isLoading } = useLoginStore();
  const router = useRouter();

  const onSubmit: SubmitHandler<TypeLoginSchema> = async (
    data: TypeLoginSchema,
  ) => {
    try {
      const serverMessage = await login(data);

      alert(serverMessage);

      setValue("email", "");
      setValue("password", "");

      router.push("/");
    } catch (error: any) {
      alert(error);

      setValue("password", "");
    }
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

      <p>
        Нет аккаунта?
        <a href="/register" className="text-primary">
          {" "}
          Зарегистрироваться
        </a>
      </p>

      <ButtonAuth>{isLoading ? "Loading..." : "Войти"}</ButtonAuth>
    </form>
  );
};
