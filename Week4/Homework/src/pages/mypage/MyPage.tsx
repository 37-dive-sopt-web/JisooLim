import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import {
  getUserProfile,
  updateUserProfile,
  type UserProfile,
} from "@/api";
import { STORAGE_KEYS } from "@/shared/constants/storage";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    const storedId = window.localStorage.getItem(STORAGE_KEYS.userId);
    if (!storedId) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getUserProfile(storedId);
        setProfile(data);
        setFormValues({
          name: data.name ?? "",
          email: data.email ?? "",
          age: data.age ? String(data.age) : "",
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "내 정보를 불러오지 못했어요.";
        alert(message);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProfile();
  }, [navigate]);

  const handleChange = (field: "name" | "email" | "age") => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSave = async () => {
    if (!profile) return;
    const { name, email, age } = formValues;
    if (!name.trim() || !email.trim() || !age.trim()) {
      alert("모든 정보를 입력해 주세요.");
      return;
    }
    const parsedAge = Number(age);
    if (Number.isNaN(parsedAge)) {
      alert("나이는 숫자로 입력해 주세요.");
      return;
    }
    try {
      setIsSaving(true);
      const updated = await updateUserProfile(profile.id, {
        name: name.trim(),
        email: email.trim(),
        age: parsedAge,
      });
      setProfile(updated);
      setFormValues({
        name: updated.name ?? "",
        email: updated.email ?? "",
        age: updated.age ? String(updated.age) : "",
      });
      alert("정보가 저장되었습니다.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "정보 저장에 실패했습니다.";
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className={s.page}>
      <section className={s.box}>
        <h2 className={s.title}>내 정보</h2>
        <div className={s.infoRow}>
          <span>아이디</span>
          <div className={s.name}>{profile?.username}</div>
        </div>
        <Input
          id="name"
          name="name"
          label="이름"
          value={formValues.name}
          placeholder={profile?.name ?? "이름을 입력하세요"}
          onChange={handleChange("name")}
          disabled={isLoading || isSaving}
        />
        <Input
          id="email"
          name="email"
          label="이메일"
          value={formValues.email}
          placeholder={profile?.email ?? "이메일을 입력하세요"}
          onChange={handleChange("email")}
          disabled={isLoading || isSaving}
        />
        <Input
          id="age"
          name="age"
          label="나이"
          value={formValues.age}
          placeholder={profile?.age ? String(profile.age) : "나이를 입력하세요"}
          onChange={handleChange("age")}
          disabled={isLoading || isSaving}
        />
        <Button
          text="저장"
          type="button"
          onClick={handleSave}
          disabled={isLoading || isSaving}
        />
      </section>
    </main>
  );
};

export default MyPage;
