import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

import {
  BuyListContainer,
  CartTitle,
  CartContainer,
  CloseButton,
  CloseButtonContainer,
  ProductContainer,
  ProductImageContainer,
  ProductInfoContainer,
  Row,
  SummaryContainer,
  CardContent,
} from "@/styles/components/cart";

import { X } from "@phosphor-icons/react";

import Image from "next/image";
import axios from "axios";

export default function Cart() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const {
    cartCount,
    cartDetails,
    shouldDisplayCart,
    formattedTotalPrice,
    handleCloseCart,
    redirectToCheckout,
    removeItem,
  } = useShoppingCart();

  const cartProducts = Object.values(cartDetails);

  async function handleBuyProducts() {
    setIsCreatingCheckoutSession(true);
    try {
      const response = await axios.post("/api/checkout", {
        cartProducts,
      });

      const result = await redirectToCheckout(response.data.sessionId);
      if (result?.error) {
        alert("Falha ao redirecionar ao checkout");
        console.error(result?.error);
        setIsCreatingCheckoutSession(false);
      }
    } catch (error) {
      alert("Falha ao redirecionar ao checkout");
      console.error(error);
      setIsCreatingCheckoutSession(false);
    }
  }

  const hasItems = cartCount > 0;

  return (
    <CartContainer className={shouldDisplayCart ? "expanded" : ""}>
      <CardContent>
        <CloseButtonContainer>
          <CloseButton onClick={() => handleCloseCart()}>
            <X size={24} color="#8D8D99" />
          </CloseButton>
        </CloseButtonContainer>

        <CartTitle>Sacola de compras</CartTitle>
        <BuyListContainer>
          {hasItems ? (
            cartProducts.map((product) => (
              <ProductContainer key={product.id}>
                <ProductImageContainer>
                  <Image src={product.image} width={90} height={90} alt="" />
                </ProductImageContainer>
                <ProductInfoContainer>
                  <div>
                    <div>
                      <p>{product.name}</p>
                      <strong>{product.formattedPrice}</strong>
                    </div>
                  </div>

                  <button type="button" onClick={() => removeItem(product.id)}>
                    Remover
                  </button>
                </ProductInfoContainer>
              </ProductContainer>
            ))
          ) : (
            <span>Não há items na sacola</span>
          )}
        </BuyListContainer>
      </CardContent>

      <SummaryContainer>
        <Row>
          <span>Quantidade</span>
          <span>{cartCount} itens</span>
        </Row>
        <Row>
          <strong>Valor total</strong>
          <strong>{formattedTotalPrice}</strong>
        </Row>

        <button
          onClick={handleBuyProducts}
          disabled={isCreatingCheckoutSession || !hasItems}
        >
          Finalizar Compra
        </button>
      </SummaryContainer>
    </CartContainer>
  );
}
