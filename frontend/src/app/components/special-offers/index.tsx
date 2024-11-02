import { Suspense } from "react";
import ProductCard from "@/app/components/card-product";
import { CardSkeleton } from "@/app/ui/skeletons";
import { fetchProducts } from "@/app/lib/data";
import { Product } from "@/app/types/types";

const ProductList = async () => {
  try {
    const products = await fetchProducts();

    const discountedProducts = products.filter((product: Product) => product.discount && product.discount > 0);

    const limitedProducts = discountedProducts.slice(0, 3);

    return (
      <div className="flex flex-wrap justify-center gap-4 m-2">
        {limitedProducts.map((product: Product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            imageUrl={product.imageUrl || ""}
            title={product.name}
            description={product.description}
            price={product.price}
            discountedPrice={product.discountedPrice}
            discount={product.discount}
            rating={product.stars}
            reviewCount={100}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="text-center text-red-500 p-4">
        Hubo un problema al cargar los productos. Por favor, intenta nuevamente más tarde.
      </div>
    );
  };
}

export default function SpecialOffers() {
  return (
    <Suspense fallback={
      <div className="flex flex-wrap justify-center gap-4 m-2">
        {[...Array(3)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    }>
      <ProductList />
    </Suspense>
  );
}
