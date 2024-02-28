import prismadb from '@/lib/prismadb';
import { ColorForm } from './components/color-form';

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
    const color = await prismadb.color.findUnique({
        where: {
            id:
                params.colorId === 'new'
                    ? '507f1f77bcf86cd799439011'
                    : params.colorId,
        },
    });
    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ColorForm initialData={color} />
            </div>
        </div>
    );
};

export default ColorPage;
