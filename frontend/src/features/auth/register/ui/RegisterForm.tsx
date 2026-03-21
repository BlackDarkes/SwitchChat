"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, TypeRegisterSchema } from "@/entities/user";
import { ButtonAuth, FieldAuth, LinkUnderline } from "@/shared/ui";
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
    watch,
  } = useForm<TypeRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const { register: resisterUser, isLoading } = useLoginStore();
  const router = useRouter();

  const onSubmit = async (data: TypeRegisterSchema) => {
    try {
      const resultMessage = await resisterUser(data);

      alert(resultMessage);

      router.push("/login");
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

      <div className="flex flex-col gap-y-2.5 pb-5 items-center relative rounded-xl">
        <div
          className="absolute inset-x-2 bottom-0 h-0.5 pointer-events-none opacity-40"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--primary-color), transparent)",
          }}
        />

        <h2 className="text-[clamp(24px,2.4vw,28px)] relative z-10">
          Регистрация
        </h2>
        <p className="text-[clamp(12px,1.4vw,14px)] relative z-10">
          Введите свои данные
        </p>
      </div>

      <div className="flex flex-col gap-y-[calc(clamp(30px,3vh,40px)+24px)] pt-5">
        <FieldAuth
          type="email"
          register={register("email")}
          placeholder="Email"
          error={errors}
          name="email"
          watch={watch}
        />

        <FieldAuth
          type="text"
          register={register("name")}
          placeholder="Name"
          error={errors}
          name="name"
          watch={watch}
        />

        <FieldAuth
          type="password"
          register={register("password")}
          placeholder="Password"
          error={errors}
          name="password"
          watch={watch}
        />
      </div>

      <p className="ml-auto">
        Уже есть аккаунт?{" "}
        <LinkUnderline title="Войти" link="/login" />
      </p>

      <ButtonAuth>{isLoading ? "Регистрация..." : "Зарегистрироваться"}</ButtonAuth>
    </form>
  );
};
