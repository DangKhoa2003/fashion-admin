import prismadb from '@/lib/prismadb';
import { CategoryForm } from './components/category-form';

const CategoryPage = async ({
    params,
}: {
    params: { categoryId: string; storeId: string };
}) => {
    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId === 'new'
                    ? '507f1f77bcf86cd799439011'
                    : params.categoryId,
        },
    });

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <CategoryForm billboards={billboards} initialData={category} />
            </div>
        </div>
    );
};

export default CategoryPage;
