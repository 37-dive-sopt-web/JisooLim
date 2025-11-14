import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import {
  getUserProfile,
  updateUserProfile,
  type UserProfile,
  type UpdateUserPayload,
} from "@/api";
import { STORAGE_KEYS } from "@/shared/constants/storage";
import type { MyPageFieldName } from "../fields";
import {
  clearProfileCache,
  profileToFormValues,
  readProfileCache,
  writeProfileCache,
} from "../utils/profileFormUtils";

const useMyPageForm = () => {
  const navigate = useNavigate();
  const initialProfile = readProfileCache();
  const [profile, setProfile] = useState<UserProfile | null>(initialProfile);
  const [formValues, setFormValues] = useState<Record<MyPageFieldName, string>>(
    () => profileToFormValues(initialProfile),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedId = window.localStorage.getItem(STORAGE_KEYS.userId);
    if (!storedId) {
      clearProfileCache();
      navigate("/");
      return;
    }

    let ignore = false;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getUserProfile(storedId);
        if (ignore) return;
        setProfile(data);
        setFormValues(profileToFormValues(data));
        writeProfileCache(data);
        if (data.name) {
          window.localStorage.setItem(STORAGE_KEYS.userName, data.name);
        }
      } catch (error) {
        if (!ignore) {
          const message =
            error instanceof Error
              ? error.message
              : "내 정보를 불러오지 못했어요.";
          alert(message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void fetchProfile();

    return () => {
      ignore = true;
    };
  }, [navigate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name as MyPageFieldName]: value }));
  };

  const getPlaceholder = (field: MyPageFieldName, fallback: string) => {
    if (!profile) return fallback;

    if (field === "age") {
      return profile.age ? String(profile.age) : fallback;
    }

    return profile[field] ?? fallback;
  };

  const validateForm = (values: Record<MyPageFieldName, string>) => {
    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();
    const trimmedAge = values.age.trim();

    if (!trimmedName || !trimmedEmail || !trimmedAge) {
      return { valid: false, message: "모든 정보를 입력해 주세요." } as const;
    }

    const parsedAge = Number(trimmedAge);
    if (Number.isNaN(parsedAge)) {
      return { valid: false, message: "나이는 숫자로 입력해 주세요." } as const;
    }

    const payload: UpdateUserPayload = {
      name: trimmedName,
      email: trimmedEmail,
      age: parsedAge,
    };

    return { valid: true, payload } as const;
  };

  const handleSave = async () => {
    if (!profile) return;
    const result = validateForm(formValues);
    if (!result.valid) {
      alert(result.message);
      return;
    }

    try {
      setIsSaving(true);
      const updated = await updateUserProfile(profile.id, result.payload);
      setProfile(updated);
      setFormValues(profileToFormValues(updated));
      writeProfileCache(updated);
      if (updated.name) {
        window.localStorage.setItem(STORAGE_KEYS.userName, updated.name);
      }
      alert("정보가 저장되었습니다.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "정보 저장에 실패했습니다.";
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profile,
    formValues,
    isLoading,
    isSaving,
    handleChange,
    handleSave,
    getPlaceholder,
  } as const;
};

export default useMyPageForm;
