import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import { useShoppingCart } from "use-shopping-cart";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
    priceData: any;
    priceAmount: number;
    currency: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { addItem, cartDetails } = useShoppingCart();

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
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button onClick={() => handleAddItemToCart(product)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "prod_Ohm4dhHzT3PDat" } },
      { params: { id: "prod_Ohm4QUKrHtQ4jm" } },
      { params: { id: "prod_Ohm4B6It5TBIPS" } },
      { params: { id: "prod_Ohm3SJ9NjkKPW1" } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format((price.unit_amount ?? 0) / 100),
        description: product.description,
        defaultPriceId: price.id,
        priceData: price,
        priceAmount: price.unit_amount,
        currency: price.currency,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
