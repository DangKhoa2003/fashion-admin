import prismadb from '@/lib/prismadb';
import { BillboardFrom } from './components/billboard-form';

const Billboard = async ({ params }: { params: { billboardId: string } }) => {
      const billboard = await prismadb.billboard.findUnique({
            where: {
                  id: params.billboardId,
            },
      });

      return (
            <div className="flex-col">
                  <div className="flex-1 space-y-4 p-8">
                        <BillboardFrom initialData={billboard} />
                  </div>
            </div>
      );
};

export default Billboard;
