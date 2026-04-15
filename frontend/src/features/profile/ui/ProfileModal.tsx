"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  const handleCloseModal = () => {
    handleOpen(); 
    setIsEditing(false); 
    setErrors({});
  };

  return (
    <Modal isOpen={isOpen} handleOpen={handleCloseModal}>
      <div
        className={cn("flex flex-col items-center gap-y-7.5")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn("flex flex-col items-center gap-y-2.5")}>
          <UserAvatar
            userAvatar={user?.avatar}
            userName={user?.name}
            isAvatar={true}
            size="big"
          />

          <div className="flex items-center gap-2">
            <h3 className={cn("text-[clamp(14px,1.5vw,16px)] text-center")}>
              {isEditing ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={cn(
                    "px-2 py-1 rounded border bg-transparent text-center focus:outline-none focus:ring-2 focus:ring-accent-color",
                    errors.name && "border-red-500"
                  )}
                  disabled={isPending}
                />
              ) : (
                user?.name
              )}
            </h3>

            {!isEditing && isMyProfile && (
              <button
                type="button"
                onClick={handleStartEdit}
                className="absolute top-5 left-5 p-1 rounded-full hover:bg-accent-bg/50 text-secondary-color hover:text-accent-color transition-colors"
                title="Редактировать профиль"
              >
                <Pencil size={20} />
              </button>
            )}
          </div>

          {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
        </div>

        <div className={cn("flex flex-col gap-y-5 w-[min(100%,250px)]")}>
          <div>
            {isEditing ? (
              <>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-3 py-2 rounded border bg-transparent focus:outline-none focus:ring-2 focus:ring-accent-color",
                    errors.email && "border-red-500"
                  )}
                  disabled={isPending}
                />
                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                <span className="text-[14px] text-secondary-color select-none">Почта</span>
              </>
            ) : (
              <>
                <p>{user?.email}</p>
                <span className="text-[14px] text-secondary-color select-none">Почта</span>
              </>
            )}
          </div>

          <div>
            {isEditing ? (
              <>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className={cn(
                    "w-full px-3 py-2 rounded border bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-accent-color",
                    errors.bio && "border-red-500"
                  )}
                  disabled={isPending}
                />
                {errors.bio && <span className="text-xs text-red-500">{errors.bio}</span>}
                <span className="text-[14px] text-secondary-color select-none">Описание</span>
              </>
            ) : user?.bio ? (
              <>
                <p>{user?.bio}</p>
                <span className="text-[14px] text-secondary-color select-none">Описание</span>
              </>
            ) : (
              <>
                <p className="text-primary-color/60 select-none">Нет описания</p>
                <span className="text-[14px] text-secondary-color select-none">Описание</span>
              </>
            )}
          </div>

          {!isEditing && (
            <div>
              <p
                className={cn("cursor-pointer")}
                onClick={() => copyName(user?.username)}
              >
                {user?.username}
              </p>
              <span className="text-[14px] text-secondary-color select-none">Тег</span>
            </div>
          )}

          {isEditing && isMyProfile && (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-secondary-color file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accent-bg file:text-accent-color"
                disabled={isPending}
              />
              {errors.avatar && <span className="text-xs text-red-500">{errors.avatar}</span>}
              <span className="text-[14px] text-secondary-color select-none">Аватар</span>
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-3 w-full justify-center mt-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="px-4 py-2 rounded-md bg-secondary-bg text-primary-color hover:opacity-80 transition disabled:opacity-50"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-2 rounded-md bg-accent-color text-white font-medium hover:opacity-80 transition disabled:opacity-50"
            >
              {isPending ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};