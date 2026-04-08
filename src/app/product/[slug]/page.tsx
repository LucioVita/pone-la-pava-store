import { client } from "@/sanity/lib/client";
import ProductDetail from "@/components/ProductDetail";
import { notFound } from "next/navigation";

async function getProduct(slug: string) {
    const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    isOnSale,
    priceBefore,
    "category": category->title,
    image,
    gallery,
    description,
    stock,
    color,
    variants[] {
      name,
      image,
      stock
    }
  }`;
    const product = await client.fetch(query, { slug });
    return product;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#faf9f6] text-[#3d2b1f] pt-20">
            <ProductDetail product={product} />
        </div>
    );
}
