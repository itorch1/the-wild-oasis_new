import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
   const queryClient = useQueryClient();
   const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
      mutationFn: updateCurrentUser,
      onSuccess: () => {
         toast.success('Account successfully updated');
         queryClient.invalidateQueries(['user']);
      },
      onError: () => {
         toast.error('Could not update account');
      },
   });

   return { updateUser, isUpdatingUser };
}
