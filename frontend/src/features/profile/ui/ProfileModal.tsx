"use client";

import { useState } from "react";
import { Pencil, Copy, Check, Upload } from "lucide-react";
import { UserAvatar } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import { copyName } from "@/shared/model/copy-name";
import { IUser } from "@/shared/types/user/user.interface";
import { Modal } from "@/shared/ui";
import { profileUpdateSchema } from "@/entities/user";
import { useProfileUpdate } from "@/features/profile-update/api/profile-update";

interface IProfileModalProps {
  user: IUser | undefined;
  isOpen: boolean;
  isMyProfile?: boolean;
  handleOpen: () => void;
}

export const ProfileModal = ({
  user,
  isOpen,
  isMyProfile = false,
  handleOpen,
}: IProfileModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: updateProfile, isPending } = useProfileUpdate();

  const handleStartEdit = () => {
    if (!user) return;
    setFormData({
      name: user.name || "",
      email: user.email || "",
      bio: user.bio || "",
      avatar: null,
    });
    setErrors({});
    setIsEditing(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, avatar: file }));
    if (errors.avatar) setErrors((prev) => ({ ...prev, avatar: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = profileUpdateSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field) newErrors[field.toString()] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    updateProfile(result.data, {
      onSuccess: () => setIsEditing(false),
    });
  };

  const handleCopyUsername = () => {
    copyName(user?.username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    handleOpen();
    setIsEditing(false);
    setErrors({});
  };

  return (
    <Modal isOpen={isOpen} handleOpen={handleClose}>
      <div
        className="flex w-full max-w-[320px] flex-col items-center gap-6 px-4 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="relative">
            <UserAvatar
              userAvatar={user?.avatar}
              userName={user?.name}
              size="big"
            />
            {isMyProfile && isEditing && formData.avatar && (
              <span className="absolute -bottom-1 -right-1 bg-accent-color text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">
                Новый
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 justify-center w-full">
            {isEditing ? (
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isPending}
                className={cn(
                  "w-full px-3 py-2 rounded-xl border border-border-color bg-primary-bg text-center text-base font-semibold text-primary-color placeholder:text-secondary-color/50 focus:outline-none focus:ring-2 focus:ring-accent-color/50 transition",
                  errors.name && "border-red-500 focus:ring-red-500/50"
                )}
                placeholder="Ваше имя"
              />
            ) : (
              <h3 className="text-lg font-bold text-center text-primary-color truncate">
                {user?.name}
              </h3>
            )}

            {!isEditing && isMyProfile && (
              <button
                type="button"
                onClick={handleStartEdit}
                className="shrink-0 p-2 rounded-full hover:bg-secondary-bg/30 text-secondary-color hover:text-accent-color transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-color/50"
                title="Редактировать профиль"
              >
                <Pencil size={18} />
              </button>
            )}
          </div>
          {errors.name && (
            <span className="text-xs text-red-500 mt-1">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-5 w-full">
          <div className="space-y-1.5">
            {isEditing ? (
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isPending}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl border border-border-color bg-primary-bg text-sm text-primary-color placeholder:text-secondary-color/50 focus:outline-none focus:ring-2 focus:ring-accent-color/50 transition",
                  errors.email && "border-red-500 focus:ring-red-500/50"
                )}
                placeholder="example@mail.com"
              />
            ) : (
              <p className="text-sm text-primary-color">{user?.email}</p>
            )}
            <span className="text-xs text-secondary-color select-none">Почта</span>
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>

          <div className="space-y-1.5">
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                disabled={isPending}
                className={cn(
                  "w-full px-3 py-2.5 rounded-xl border border-border-color bg-primary-bg text-sm text-primary-color placeholder:text-secondary-color/50 resize-none focus:outline-none focus:ring-2 focus:ring-accent-color/50 transition",
                  errors.bio && "border-red-500 focus:ring-red-500/50"
                )}
                placeholder="Расскажите о себе"
              />
            ) : user?.bio ? (
              <p className="text-sm text-primary-color leading-relaxed">
                {user.bio}
              </p>
            ) : (
              <p className="text-sm text-secondary-color italic">Нет описания</p>
            )}
            <span className="text-xs text-secondary-color select-none">Описание</span>
            {errors.bio && (
              <span className="text-xs text-red-500">{errors.bio}</span>
            )}
          </div>

          {!isEditing && (
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={handleCopyUsername}
                className="flex items-center gap-1.5 text-sm text-accent-color hover:underline focus:outline-none transition"
              >
                <span>@{user?.username}</span>
                {copied ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
              <span className="text-xs text-secondary-color select-none">Тег</span>
            </div>
          )}

          {isEditing && isMyProfile && (
            <div className="space-y-1.5">
              <label className="flex items-center justify-center w-full px-4 py-3 rounded-xl border border-dashed border-border-color bg-primary-bg/50 cursor-pointer hover:bg-secondary-bg/20 transition">
                <Upload size={16} className="mr-2 text-secondary-color" />
                <span className="text-xs text-secondary-color truncate max-w-50">
                  {formData.avatar ? formData.avatar.name : "Загрузить аватар"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isPending}
                />
              </label>
              {errors.avatar && (
                <span className="text-xs text-red-500">{errors.avatar}</span>
              )}
              <span className="text-xs text-secondary-color select-none">Аватар</span>
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-3 w-full mt-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setErrors({});
              }}
              disabled={isPending}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border-color bg-primary-bg text-sm font-medium text-primary-color hover:bg-secondary-bg/30 transition disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-color/50"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="flex-1 px-4 py-2.5 rounded-xl bg-accent-color text-sm font-medium text-white hover:opacity-90 active:scale-[0.98] transition disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-color/50"
            >
              {isPending ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};