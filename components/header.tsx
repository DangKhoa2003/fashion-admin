import { redirect } from 'next/navigation';
import { UserButton, auth } from '@clerk/nextjs';

import { ThemeToggle } from '@/components/theme-toggle';
import StoreSwitcher from '@/components/store-switcher';
import prismadb from '@/lib/prismadb';
import { Separator } from '@/components/ui/separator';

interface HeaderProps {}
export default async function Header(props: HeaderProps) {
      const { userId } = auth();
      if (!userId) {
            redirect('/sign-in');
      }

      const stores = await prismadb.store.findMany({
            where: {
                  userId,
            },
      });
      return (
            <header className="sticky top-0 w-[80vw] bg-background z-50">
                  <div className="py-4 flex items-center justify-between">
                        <div>
                              <h2 className="text-[1.7rem] font-bold">
                                    Dashboard
                              </h2>
                              <p className="text-md transition-colors text-muted-foreground">
                                    Detailed information about your store
                              </p>
                        </div>

                        <div className="flex items-center gap-x-10">
                              <StoreSwitcher items={stores} />
                              <ThemeToggle />
                              <UserButton />
                        </div>
                  </div>

                  <Separator />
            </header>
      );
}
