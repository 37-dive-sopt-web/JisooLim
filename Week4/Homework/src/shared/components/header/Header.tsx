import * as s from "./Header.css";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className={s.header}>
      <section className={s.leftSection}>
        <div className={s.title}>마이페이지</div>
        <p>안녕하세요 ooo님</p>
      </section>

      <section className={s.rightSection}>
        <Link to="/mypage" className={s.linkText}>
          내 정보
        </Link>
        <Link to="/mypage/members" className={s.linkText}>
          회원 조회
        </Link>
        <button className={s.button}>로그아웃</button>
        <button className={s.button}>회원 탈퇴</button>
      </section>
    </header>
  );
};

export default Header;
