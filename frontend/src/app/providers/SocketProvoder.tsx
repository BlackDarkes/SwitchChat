'use client';

import { useEffect, useRef } from 'react';
import { initSocket } from '@/shared/api/socket';

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const initialized = useRef(false);
  const apiUrl = process.env.API_URL;

  useEffect(() => {
    if (!apiUrl || initialized.current) return;

    initSocket(apiUrl);
    initialized.current = true;

    return () => {
      // Не отключаем при навигации
    };
  }, [apiUrl]);

  return <>{children}</>;
};