import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import SideBar from '@/components/sidebar';
import Header from '@/components/header';


export default async function DashboardLayout({
      children,
      params,
}: {
      children: React.ReactNode;
      params: { storeId: string };
}) {
      const { userId } = auth();

      if (!userId) {
            redirect('/sign-in');
      }

      const store = await prismadb.store.findFirst({
            where: {
                  id: params.storeId,
                  userId,
            },
      });

      if (!store) {
            redirect('/');
      }

      return (
            <>
                  <SideBar store={store} />
                  <div className="grid grid-cols-12">
                        <div className="col-span-2"></div>
                        <div className="col-span-10 md:px-4 xl:px-6">
                              <Header />
                              {children}
                        </div>
                  </div>
            </>
      );
}
