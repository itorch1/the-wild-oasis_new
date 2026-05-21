import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
   const {
      register,
      handleSubmit,
      getValues,
      reset,
      formState: { errors },
   } = useForm();
   const { signUp, isSigningUp } = useSignup();

   function onSubmit({ fullName, email, password }) {
      signUp({ fullName, email, password }, { onSuccess: () => reset() });
   }

   return (
      <Form onSubmit={handleSubmit(onSubmit)}>
         <FormRow label="Full name" error={errors.fullName}>
            <Input
               type="text"
               id="fullName"
               {...register('fullName', {
                  required: 'This field is required',
                  minLength: { value: 3, message: 'Name should be at least 3 characters long' },
               })}
               disabled={isSigningUp}
            />
         </FormRow>

         <FormRow label="Email address" error={errors.email}>
            <Input
               type="email"
               id="email"
               {...register('email', {
                  required: 'This field is required',
                  validate: value => /\S+@\S+\.\S+/.test(value) || 'Must be a valid email',
               })}
               disabled={isSigningUp}
            />
         </FormRow>

         <FormRow label="Password (min 8 characters)" error={errors.password}>
            <Input
               type="password"
               id="password"
               {...register('password', {
                  required: 'This field is required',
                  minLength: { value: 8, message: 'Must be at least 8 characters long' },
               })}
               disabled={isSigningUp}
            />
         </FormRow>

         <FormRow label="Repeat password" error={errors.passwordConfirm}>
            <Input
               type="password"
               id="passwordConfirm"
               {...register('passwordConfirm', {
                  validate: value => value === getValues().password || 'Must match the password',
               })}
               disabled={isSigningUp}
            />
         </FormRow>

         <FormRow>
            {/* type is an HTML attribute! */}
            <Button variation="secondary" type="reset" onClick={reset}>
               Cancel
            </Button>
            <Button disabled={isSigningUp}>Create new user</Button>
         </FormRow>
      </Form>
   );
}

export default SignupForm;
