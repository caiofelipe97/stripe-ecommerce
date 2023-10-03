import type { AppProps } from "next/app";
import { CartProvider } from "use-shopping-cart";
import { globalStyles } from "@/styles/global";
import Header from "@/components/Header";
import { Container } from "@/styles/pages/app";
import Cart from "@/components/Cart";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_PUBLIC_KEY!}
      currency="BRL"
      shouldPersist
    >
      <Container>
        <Header />
        <Component {...pageProps} />
        <Cart />
      </Container>
    </CartProvider>
  );
}
