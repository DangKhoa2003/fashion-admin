import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';


import { ProductClient } from './components/client';
import { ProductColumn } from './components/columns';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
      const products = await prismadb.product.findMany({
            where: {
                  storeId: params.storeId
            },
            include: {
                  category: true,
                  size: true,
                  color: true,

            },
            orderBy: {
                  createdAt: 'desc'
            }
      });

      const formattedProducts: ProductColumn[] = products.map((item) => ({
            id: item.id,
            name: item.name,
            isFeatured: item.isFeatured,
            isArchived: item.isArchived,
            price: formatter.format(item.price),
            category: item.category.name,
            inStock: item.inStock,
            size: item.size.name,
            color: item.color.name,
            createdAt: format(item.createdAt, 'MMM do, yyyy'),
      }));

      return (
            <div className="flex-col">
                  <div className="flex-1 p-8 pt-6 space-y-4">
                        <ProductClient data={formattedProducts} />
                  </div>
            </div>
      );
};

export default ProductsPage;
