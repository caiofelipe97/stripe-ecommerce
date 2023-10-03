import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import {
  CartButton,
  HeaderContainer,
  CartBadge,
} from "@/styles/components/header";
import { Handbag } from "@phosphor-icons/react";
import { theme } from "@/styles";
import logoImg from "@/assets/logo.svg";

export default function Header() {
  const { cartCount, handleCartClick } = useShoppingCart();

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />
      <CartButton type="button" onClick={() => handleCartClick()}>
        <Handbag color={theme.colors.gray500.value} size={32} />
        <CartBadge>{cartCount}</CartBadge>
      </CartButton>
    </HeaderContainer>
  );
}
