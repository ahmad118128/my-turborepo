import { QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface ApiError {
  response?: {
    data?: {
      error?: string;
      message?: string;
      action?: string;
    };
  };
  error?: string;
}

const getApiErrorMessage = (error: unknown) => {
  const e = error as ApiError;
  const errData = e?.response?.data;
  return errData?.error || 'خطای داخلی رخ داده است.';
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(getApiErrorMessage(error), {
        toastId: getApiErrorMessage(error),
      });
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
    },
    mutations: {
      onError: (error) => {
        toast.error(getApiErrorMessage(error), {
          toastId: getApiErrorMessage(error),
        });
      },
    },
  },
});

export const invalidateQueries = (queryKey: string[]) => {
  queryClient.invalidateQueries({ queryKey });
};

export const resetQueries = (queryKey: string[]) => {
  queryClient.resetQueries({ queryKey });
};

export const prefetchQuery = async <T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: { staleTime?: number },
) => {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: options?.staleTime,
  });
};

// This function clears all the cash of the client
export const clearAllCash = () => {
  queryClient.clear();
};
