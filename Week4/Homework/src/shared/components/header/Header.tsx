import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { deleteUserAccount } from "@/api";
import IcMenubar from "@/assets/svgs/IcMenubar";
import WithdrawalModal from "@/shared/components/modal/WithdrawalModal";
import * as s from "./Header.css";

type NavAction = "logout" | "withdraw";

type NavItem = LinkNavItem | ButtonNavItem;

interface LinkNavItem {
  id: string;
  label: string;
  type: "link";
  to: string;
  exact?: boolean;
}

interface ButtonNavItem {
  id: NavAction;
  label: string;
  type: "button";
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "profile",
    label: "내 정보",
    type: "link",
    to: "/mypage",
    exact: true,
  },
  {
    id: "members",
    label: "회원 조회",
    type: "link",
    to: "/mypage/members",
    exact: true,
  },
  { id: "logout", label: "로그아웃", type: "button" },
  { id: "withdraw", label: "회원 탈퇴", type: "button" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleMenuItemClick = () => setIsMenuOpen(false);
  const openWithdrawalModal = () => setIsWithdrawalModalOpen(true);
  const closeWithdrawalModal = () => setIsWithdrawalModalOpen(false);

  const handleLogout = () => {
    window.localStorage.removeItem("userId");
    navigate("/");
  };

  const handleNavButtonClick = (itemId: NavAction) => {
    if (itemId === "withdraw") {
      openWithdrawalModal();
    }
    if (itemId === "logout") {
      handleLogout();
    }
  };

  const handleConfirmWithdrawal = async () => {
    if (isWithdrawing) return;
    const storedId = window.localStorage.getItem("userId");
    if (!storedId) {
      alert("로그인 정보가 없습니다.");
      return;
    }
    try {
      setIsWithdrawing(true);
      await deleteUserAccount(storedId);
      alert("회원 탈퇴가 완료되었습니다.");
      window.localStorage.removeItem("userId");
      closeWithdrawalModal();
      navigate("/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "회원 탈퇴에 실패했습니다.";
      alert(message);
    } finally {
      setIsWithdrawing(false);
    }
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
              <Link
                key={item.id}
                to={item.to}
                className={`${s.linkText} ${
                  (
                    item.exact
                      ? location.pathname === item.to
                      : location.pathname.startsWith(item.to)
                  )
                    ? s.activeLink
                    : ""
                }`}
              >
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
            )
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
              className={`${s.mobileMenuItem} ${
                (
                  item.exact
                    ? location.pathname === item.to
                    : location.pathname.startsWith(item.to)
                )
                  ? s.activeMobileLink
                  : ""
              }`}
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
          )
        )}
      </nav>

      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onCancel={closeWithdrawalModal}
        onConfirm={handleConfirmWithdrawal}
        isLoading={isWithdrawing}
      />
    </header>
  );
};

export default Header;
