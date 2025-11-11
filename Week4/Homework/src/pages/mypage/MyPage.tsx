import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserProfile, type UserProfile } from "@/api";
import Button from "@/shared/components/button/Button";
import Input from "@/shared/components/input/Input";
import * as s from "./MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedId = window.localStorage.getItem("userId");
    if (!storedId) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getUserProfile(storedId);
        setProfile(data);
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
          placeholder={profile?.name}
          disabled={isLoading}
        />
        <Input
          id="email"
          name="email"
          label="이메일"
          placeholder={profile?.email}
          disabled={isLoading}
        />
        <Input
          id="age"
          name="age"
          label="나이"
          placeholder={profile?.age ? String(profile.age) : "나이를 입력하세요"}
          disabled={isLoading}
        />
        <Button text="저장" type="button" disabled />
      </section>
    </main>
  );
};

export default MyPage;
