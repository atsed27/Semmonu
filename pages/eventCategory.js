import EventWizard from '@/components/EventWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/store';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function EventCategory() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { ticket } = state;
  const { createEvent } = ticket;
  useEffect(() => {
    if (!createEvent?.address) {
      router.push('/createEvent');
    }
    setValue('category', createEvent?.category);
    setValue('tag', createEvent?.tag);
  }, [setValue, createEvent, router]);
  const submitHandler = ({ category, tag }) => {
    dispatch({
      type: 'Save_Create_Event',
      payload: { category, tag },
    });

    router.push('/eventUpload');
  };

  return (
    <Layout title="create">
      <div className="container px-4 m-auto mt-4">
        <EventWizard activeStep={2} />
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="max-w-screen-md mx-auto"
        >
          <h1 className="mb-4 text-xl">Category</h1>
          <div className="mb-4">
            <label htmlFor="fullName">Event category</label>
            <input
              id="category"
              autoFocus
              className="w-full"
              {...register('category', {
                required: 'Please Enter Event category',
              })}
            />
            {errors.category && (
              <div className="text-red-500">{errors.category.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="address">Tag</label>
            <input
              id="tag "
              className="w-full"
              {...register('tag', {
                required: 'Please Enter Event Tags',
              })}
            />
            {errors.tag && (
              <div className="text-red-500">{errors.tag.message}</div>
            )}
          </div>

          <div className="flex flex-row justify-between mb-4">
            <button
              onClick={() => router.push('/createEvent')}
              className="default-button"
              type="button"
            >
              Back
            </button>
            <button className="primary-button">Next</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default EventCategory;
