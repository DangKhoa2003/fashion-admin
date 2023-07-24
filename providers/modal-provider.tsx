'use client';

/* Luồng chạy Modal:
            ui/modal: chịu trách nhiệm ui modal
            hooks/use-store-modal: chịu trách nhiệm chức năng đóng mở
            components/modals/store-modal.tsx: Gọi UI và truyền chức năng đóng mở vào (tổng hợp 2 thằng trên lại)
            providers/modal-provider.tsx: đưa thằng Store Modal này ra global
      */

import { StoreModal } from '@/components/modals/store-modal';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
      const [isMounted, setIsMount] = useState(false);

      useEffect(() => {
            setIsMount(true);
      }, []);

      if (!isMounted) {
            return null;
      }

      return (
            <>
                  <StoreModal />
            </>
      );
};
