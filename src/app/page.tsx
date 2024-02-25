"use client"
import ProductList from "@/app/ui/products/productList";
import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const allProducts = useAppSelector(state => state.productReducer.products)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-15">
      <ProductList products={allProducts} />
    </main>
  );
}
