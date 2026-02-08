"use client";

import { ReactNode, useState } from "react";
import { QueryClientProvider, createQueryClient } from "@repo/core";

interface IQueryRouter {
  children: ReactNode;
}

export const QueryRouter = ({ children }: IQueryRouter) => {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}