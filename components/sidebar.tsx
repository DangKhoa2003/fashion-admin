'use client';
import { Store } from '@prisma/client';
import {
      Image,
      LayoutGrid,
      Palette,
      Ruler,
      Settings,
      Shirt,
      ShoppingCart,
      Slack,
      HelpCircle,
      BarChart3,
} from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { MainNav } from '@/components/main-nav';
import { Separator } from '@/components/ui/separator';

interface SideBarProps {
      store: Store;
}

const SideBar: React.FC<SideBarProps> = ({ store }) => {
      const pathname = usePathname();
      const params = useParams();
      const routes = [
            {
                  href: `/${params.storeId}`,
                  label: 'Overview',
                  active: pathname === `/${params.storeId}`,
                  icon: <LayoutGrid />,
            },
            {
                  href: `/${params.storeId}/billboards`,
                  label: 'Billboards',
                  active: pathname === `/${params.storeId}/billboards`,
                  icon: <Image />,
            },
            {
                  href: `/${params.storeId}/categories`,
                  label: 'Categories',
                  active: pathname === `/${params.storeId}/categories`,
                  icon: <Slack />,
            },
            {
                  href: `/${params.storeId}/sizes`,
                  label: 'Sizes',
                  active: pathname === `/${params.storeId}/sizes`,
                  icon: <Ruler />,
            },
            {
                  href: `/${params.storeId}/colors`,
                  label: 'Colors',
                  active: pathname === `/${params.storeId}/colors`,
                  icon: <Palette />,
            },
            {
                  href: `/${params.storeId}/products`,
                  label: 'Products',
                  active: pathname === `/${params.storeId}/products`,
                  icon: <Shirt />,
            },
            {
                  href: `/${params.storeId}/orders`,
                  label: 'Orders',
                  active: pathname === `/${params.storeId}/orders`,
                  icon: <ShoppingCart />,
            },
      ];

      const supRoutes = [
            {
                  href: `/${params.storeId}`,
                  label: 'Help Center',
                  active: pathname === `/${params.storeId}/helps`,
                  icon: <HelpCircle />,
            },
            {
                  href: `/${params.storeId}/settings`,
                  label: 'Settings',
                  active: pathname === `/${params.storeId}/settings`,
                  icon: <Settings />,
            },
            {
                  href: `/${params.storeId}`,
                  label: 'Reports',
                  active: pathname === `/${params.storeId}/reports`,
                  icon: <BarChart3 />,
            },
      ];
      return (
            <div className="h-screen w-[17vw] pl-4 md:pl-4 xl:pl-6 bg-backgroundExtra fixed left-0 top-0 z-50">
                  <div className="flex select-none items-center pr-4 pt-4 mb-8 lg:mb-8 text-primary h-[10vh]">
                        <h1 className="text-[1.75rem] font-medium">
                              {store.name}
                        </h1>
                  </div>

                  <div className="h-[80vh] hover:overflow-y-auto transition-all duration-300 ease-linear">
                        <MainNav routes={routes} className={null} />
                        <Separator className="mb-8 lg:mb-8" />
                        <MainNav routes={supRoutes} className={null} />
                  </div>
            </div>
      );
};

export default SideBar;
