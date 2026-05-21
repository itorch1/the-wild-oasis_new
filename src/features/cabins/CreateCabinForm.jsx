import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
   const { isCreating, createCabin } = useCreateCabin();
   const { isEditing, editCabin } = useEditCabin();
   const isWorking = isCreating || isEditing;

   const { id: editId, ...editValues } = cabinToEdit;
   const isEditSession = Boolean(editId);

   const {
      register,
      handleSubmit,
      reset,
      getValues,
      formState: { errors },
   } = useForm({
      defaultValues: editValues,
   });

   function onSubmit(data) {
      const image = typeof data.image === 'string' ? data.image : data.image[0];

      const newCabin = {
         ...data,
         maxCapacity: +data.maxCapacity,
         regularPrice: +data.regularPrice,
         discount: +data.discount,
         image,
      };

      if (isEditSession) editCabin({ newCabinData: newCabin, id: editId }, { onSettled: onCloseModal });
      if (!isEditSession)
         createCabin(newCabin, {
            onSuccess: reset,
            onSettled: onCloseModal,
         });
   }

   return (
      <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
         <FormRow label="Cabin name" error={errors.name}>
            <Input
               type="text"
               id="name"
               disabled={isWorking}
               {...register('name', {
                  required: 'This field is required',
               })}
            />
         </FormRow>

         <FormRow label="Maximum capacity" error={errors.maxCapacity}>
            <Input
               type="number"
               id="maxCapacity"
               disabled={isWorking}
               {...register('maxCapacity', {
                  required: 'This field is required',
                  min: {
                     value: 1,
                     message: 'Capacity should be at least 1',
                  },
               })}
            />
         </FormRow>

         <FormRow label="Regular price" error={errors.regularPrice}>
            <Input
               type="number"
               id="regularPrice"
               disabled={isWorking}
               {...register('regularPrice', {
                  required: 'This field is required',
                  min: {
                     value: 1,
                     message: 'Price should be at least 1',
                  },
               })}
            />
         </FormRow>

         <FormRow label="Discount" error={errors.discount}>
            <Input
               type="number"
               id="discount"
               disabled={isWorking}
               defaultValue={0}
               {...register('discount', {
                  required: 'This field is required',
                  validate: value => {
                     if (+value < 0) return 'Discount cannot be a negative value';
                     if (+value >= +getValues().regularPrice) return 'Discount should be less than price';
                     return true;
                  },
               })}
            />
         </FormRow>

         <FormRow label="Description for website" error={errors.description}>
            <Textarea
               type="number"
               id="description"
               disabled={isWorking}
               defaultValue=""
               {...register('description', {
                  required: 'This field is required',
               })}
            />
         </FormRow>

         <FormRow label="Cabin photo" error={errors.image}>
            <FileInput
               id="image"
               accept="image/*"
               disabled={isWorking}
               defaultValue=""
               {...register('image', {
                  required: isEditSession ? false : 'This field is required',
               })}
            />
         </FormRow>

         <FormRow>
            {/* type is an HTML attribute! */}
            <Button variation="secondary" type="reset" onClick={onCloseModal}>
               Cancel
            </Button>
            <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
         </FormRow>
      </Form>
   );
}

export default CreateCabinForm;
