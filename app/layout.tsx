import './globals.css';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from '@/providers/modal-provider';
import { ToasterProvider } from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const sora = Sora({
      subsets: ['latin'],
      variable: '--font-sora',
      weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
      title: 'Fashion Admin',
      description: 'Fashion Admin',
};

export default function RootLayout({
      children,
}: {
      children: React.ReactNode;
}) {
      return (
            <ClerkProvider>
                  <html lang="en">
                        <body className={sora.variable}>
                              <ThemeProvider
                                    attribute="class"
                                    defaultTheme="light"
                                    enableSystem
                              >
                                    <ToasterProvider />
                                    <ModalProvider />
                                    {children}
                              </ThemeProvider>
                        </body>
                  </html>
            </ClerkProvider>
      );
}
