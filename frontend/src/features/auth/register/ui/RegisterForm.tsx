"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, TypeRegisterSchema } from "@/entities/user";
import { ButtonAuth, FieldAuth } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { ThemeToggle } from "../../../theme-toggle";
import { useLoginStore } from "../../model/login-store";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TypeRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const { register: resisterUser, isLoading } = useLoginStore();
  const router = useRouter();

  const onSubmit = async (data: TypeRegisterSchema) => {
    try {
      const resultMessage = await resisterUser(data);

      alert(resultMessage);

      router.push("/");
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
        <h2 className="text-[clamp(24px,2.4vw,28px)]">Регистрация</h2>
        <p className="text-[clamp(12px,1.4vw,14px)]">
          Пожалуйста, заполните поля для регистрации
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
          type="text"
          register={register("name")}
          placeholder="Name"
          error={errors}
          name="name"
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
        Уже зарегистрированы?
        <a href="/login" className="text-primary">
          {" "}
          Войти
        </a>
      </p>

      <ButtonAuth>{isLoading ? "Loading..." : "Зарегистрироваться"}</ButtonAuth>
    </form>
  );
};
