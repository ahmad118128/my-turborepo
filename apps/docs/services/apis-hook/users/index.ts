import { useQuery } from '@tanstack/react-query';
import { UserService } from 'services/apis-hook/users/users.service';

export const USER_LEAD_KEY = 'LEADS_KEY';

const userService = new UserService();

export const useGetUsers = (
  params?: Partial<Record<string, string | number | boolean | null>>,
  enabled = true,
) => {
  return useQuery({
    queryKey: [USER_LEAD_KEY, params],
    queryFn: () => userService.getAll(),
    enabled,
  });
};
