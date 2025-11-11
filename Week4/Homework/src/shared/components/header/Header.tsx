import { useState } from "react";
import { Link } from "react-router";
import IcMenubar from "@/assets/svgs/IcMenubar";
import WithdrawalModal from "@/shared/components/modal/WithdrawalModal";
import * as s from "./Header.css";

type NavItem =
  | { id: string; label: string; type: "link"; to: string }
  | { id: string; label: string; type: "button" };

const NAV_ITEMS: NavItem[] = [
  { id: "profile", label: "내 정보", type: "link", to: "/mypage" },
  { id: "members", label: "회원 조회", type: "link", to: "/mypage/members" },
  { id: "logout", label: "로그아웃", type: "button" },
  { id: "withdraw", label: "회원 탈퇴", type: "button" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleMenuItemClick = () => setIsMenuOpen(false);
  const openWithdrawalModal = () => setIsWithdrawalModalOpen(true);
  const closeWithdrawalModal = () => setIsWithdrawalModalOpen(false);

  const handleNavButtonClick = (itemId: string) => {
    if (itemId === "withdraw") {
      openWithdrawalModal();
    }
  };

  const handleConfirmWithdrawal = () => {
    setIsWithdrawalModalOpen(false);
  };

  return (
    <header className={s.header}>
      <div className={s.topRow}>
        <section className={s.leftSection}>
          <div className={s.title}>마이페이지</div>
          <p className={s.greet}>안녕하세요 ooo님</p>
        </section>

        <section className={s.rightSection}>
          {NAV_ITEMS.map((item) =>
            item.type === "link" ? (
              <Link key={item.id} to={item.to} className={s.linkText}>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                className={s.button}
                type="button"
                onClick={() => handleNavButtonClick(item.id)}
              >
                {item.label}
              </button>
            ),
          )}
        </section>

        <button
          type="button"
          className={s.menuButton}
          onClick={toggleMenu}
          aria-label="메뉴 열기"
          aria-expanded={isMenuOpen}
        >
          <IcMenubar width={28} height={28} />
        </button>
      </div>

      <nav
        className={`${s.mobileMenu} ${isMenuOpen ? s.mobileMenuOpen : ""}`}
        aria-hidden={!isMenuOpen}
      >
        {NAV_ITEMS.map((item) =>
          item.type === "link" ? (
            <Link
              key={item.id}
              to={item.to}
              className={s.mobileMenuItem}
              onClick={handleMenuItemClick}
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.id}
              type="button"
              className={s.mobileMenuItem}
              onClick={() => {
                handleMenuItemClick();
                handleNavButtonClick(item.id);
              }}
            >
              {item.label}
            </button>
          ),
        )}
      </nav>

      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onCancel={closeWithdrawalModal}
        onConfirm={handleConfirmWithdrawal}
      />
    </header>
  );
};

export default Header;
