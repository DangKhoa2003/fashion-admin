'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface MainNavProps {
      routes: any[];
      className: React.HTMLAttributes<HTMLElement> | null;
}

export const MainNav: React.FC<MainNavProps> = ({ routes, className, ...props }) => {
      return (
            <nav
                  className={cn(
                        'flex flex-col justify-center mb-8 lg:mb-8',
                        className,
                  )}
            >
                  {routes.map(
                        (route: {
                              href: string;
                              label: string;
                              active: boolean;
                              icon: React.ReactNode;
                        }) => (
                              <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                          `text-sm whitespace-nowrap transition-all duration-0 ease-in-out flex py-4 pl-6 items-center font-medium group hover:text-black dark:hover:text-white`,
                                          route.active
                                                ? 'text-black dark:text-white bg-background rounded-s-3xl relative before:absolute before:-top-[40px] before:rounded-[50%] before:right-0 before:h-[40px] before:w-[40px] before:shadow-boxShadow-before after:absolute after:-bottom-[40px] after:rounded-[50%] after:right-0 after:h-[40px] after:w-[40px] after:shadow-boxShadow-after'
                                                : 'text-muted-foreground',
                                    )}
                              >
                                    <span className="group-hover:translate-x-2">
                                          {route.icon}
                                    </span>
                                    <h2 className="ml-3 group-hover:translate-x-2">
                                          {route.label}
                                    </h2>
                              </Link>
                        ),
                  )}
            </nav>
      );
};
