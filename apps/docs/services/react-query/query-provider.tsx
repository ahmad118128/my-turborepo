'use client';

import { DehydratedState, HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import type * as React from 'react';
import { queryClient } from 'services/react-query/query-client';

export function ReactQueryProvider({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}

      </HydrationBoundary>
      
    </QueryClientProvider>
  );
}
