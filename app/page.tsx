import { mockProducts } from '@/lib/mocks';
import { ProductCard } from './_components/ProductCard';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Showing {mockProducts.length} product
        {mockProducts.length !== 1 ? 's' : ''}
      </p>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
