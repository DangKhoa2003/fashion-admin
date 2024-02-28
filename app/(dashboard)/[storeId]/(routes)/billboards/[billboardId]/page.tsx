import prismadb from '@/lib/prismadb';
import { BillboardFrom } from './components/billboard-form';

const Billboard = async ({ params }: { params: { billboardId ?: string } }) => {
    const billboard = await prismadb.billboard.findFirst({
        where: {
            id: '507f1f77bcf86cd799439011',
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 space-y-4">
                <BillboardFrom initialData={billboard} />
            </div>
        </div>
    );
};

export default Billboard;
