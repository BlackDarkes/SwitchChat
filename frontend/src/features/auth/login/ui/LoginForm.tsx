/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TypeLoginSchema } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import { ThemeToggle } from "../../../theme-toggle";
import { useLoginStore } from "../../model/login-store";
import { useRouter } from "next/navigation";
import { InputField, LinkUnderline } from "@/shared/ui";
import { ButtonAuth } from "../../ui";
import { useToastStore } from "@/features/toast";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TypeLoginSchema>({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login, isLoading } = useLoginStore();
  const { handleOpen, setMessage, setType } = useToastStore();
  const router = useRouter();

  const onSubmit: SubmitHandler<TypeLoginSchema> = async (
    data: TypeLoginSchema,
  ) => {
    try {
      const serverMessage = await login(data);

      setMessage(serverMessage!);
      setType("success");
      handleOpen();

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

      <div className="flex flex-col gap-y-2.5 pb-5 items-center relative rounded-xl">
        <div
          className="absolute inset-x-2 bottom-0 h-0.5 pointer-events-none opacity-40"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--primary-color), transparent)",
          }}
        />

        <h2 className="text-[clamp(28px,2.4vw,32px)] relative z-10">Войти</h2>
        <p className="text-[clamp(14px,1.4vw,16px)] relative z-10">
          Введите свои данные
        </p>
      </div>

      <div className="flex flex-col gap-y-[calc(clamp(30px,3vh,40px)+24px)] pt-5">
        <InputField
          type="email"
          register={register("email")}
          placeholder="Почта"
          error={errors}
          name="email"
          watch={watch}
        />

        <InputField
          type="password"
          register={register("password")}
          placeholder="Пароль"
          error={errors}
          name="password"
          watch={watch}
        />
      </div>

      <p className="ml-auto">
        Нет аккаунта?{" "}
        <LinkUnderline title="Зарегистрироваться" link="/register" />
      </p>

      <ButtonAuth>{isLoading ? "Авторизация..." : "Войти"}</ButtonAuth>
    </form>
  );
};
