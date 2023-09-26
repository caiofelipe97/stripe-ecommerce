import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { useRouter } from "next/router";

export default function Product() {
  const { query } = useRouter();
  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          suscipit suscipit risus, a interdum quam malesuada nec. Aliquam quis
          convallis arcu. Praesent vel hendrerit turpis. Nulla facilisi. Morbi
          vel dui a libero volutpat accumsan ut id quam
        </p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}
