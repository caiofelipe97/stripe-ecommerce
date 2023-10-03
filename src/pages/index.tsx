import { GetStaticProps } from "next";
import { useShoppingCart } from "use-shopping-cart";
import Head from "next/head";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

import { stripe } from "@/lib/stripe";
import {
  AddToCartButton,
  HomeContainer,
  Product,
  ProductInfoContainer,
} from "@/styles/pages/home";

import "keen-slider/keen-slider.min.css";
import Stripe from "stripe";
import Link from "next/link";
import { Handbag } from "@phosphor-icons/react";
import { theme } from "@/styles";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    priceData: any;
    priceAmount: number;
    currency: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const { addItem, cartDetails } = useShoppingCart();
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  const handleAddItemToCart = (product: any) => {
    if (!cartDetails[product.id])
      addItem({
        name: product.name,
        id: product.id,
        price: product.priceAmount,
        currency: product.currency,
        image: product.imageUrl,
        price_data: product.priceData,
        product_data: product,
      });
    else {
      alert("Produto já está no carrinho!");
    }
  };

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={520} alt="" />
                <footer>
                  <ProductInfoContainer>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </ProductInfoContainer>

                  <AddToCartButton
                    onClick={(event) => {
                      event.preventDefault();

                      handleAddItemToCart(product);
                    }}
                  >
                    <Handbag
                      color={theme.colors.white.value}
                      size={24}
                      strokeWidth={5}
                    />
                  </AddToCartButton>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format((price.unit_amount ?? 0) / 100),
      priceData: price,
      priceAmount: price.unit_amount,
      currency: price.currency,
    };
  });
  return {
    props: {
      products,
    },
  };
};
