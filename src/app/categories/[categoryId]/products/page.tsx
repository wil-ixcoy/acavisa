import Header from "@/components/ladingpage/header";
import NavBar from "@/components/ladingpage/navBar";
import Footer from "@/components/ladingpage/footer";
import Product from "@/components/ladingpage/productCard";
import { headers } from "next/headers";

interface Product {
  created_at: string;
  nombre_producto: string;
  image: string;
  description: string;
  product_code: string;
  category: string;
}

interface ApiResponse {
  products: Product[];
}

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function ProductsPage({ params }: PageProps) {
  const { categoryId } = await params;
  const image ="https://plus.unsplash.com/premium_photo-1677009541899-28700f6c20a8?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  let products: Product[] = [];
  let error: string | null = null;
  const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || `http://${(await headers()).get("host")}`;


  try {
    const response = await fetch(`${baseUrl}/api/categories/${categoryId}/products`, {
      method: "GET",
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }

    const data: ApiResponse = await response.json();

    console.log(data)
    products = data.products || [];
  } catch {
    error = "No se pudieron cargar los productos.";
  }

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/background.jpg')" }}
    >
      <header>
        <Header />
        <NavBar />
      </header>

      <main className="mx-auto pt-1 pb-13 px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {error ? (
            <p className="text-center col-span-3">{error}</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Product
                key={product.product_code} 
                id={product.product_code}
                title={product.nombre_producto}
                image={product.image || image}
              />
            ))
          ) : (
            <p className="text-center col-span-3">
              No hay productos en esta categoría.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}