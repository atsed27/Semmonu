import EventWizard from '@/components/EventWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/store';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function EventUpload() {
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
  const submitHandler = ({ cover }) => {
    console.log(cover);
    dispatch({
      type: 'Save_Create_Event',
      payload: { cover },
    });
  };
  useEffect(() => {
    if (!createEvent.address) {
      router.push('/createEvent');
    }
    setValue('cover', createEvent.cover);
  }, [setValue, createEvent, router]);
  return (
    <Layout title="upload">
      <div className="container px-4 m-auto mt-4">
        <EventWizard activeStep={3} />
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="max-w-screen-md mx-auto"
        >
          <h1 className="mb-4 text-xl">Upload</h1>
          <div className="mb-4">
            <label className="my-2" htmlFor="fullName">
              cover picture
            </label>
            <input
              type="file"
              id="cover"
              className="w-full border-none"
              {...register('cover', {
                required: 'Please Enter Event cover picture',
              })}
            />
            {errors.cover && (
              <div className="text-red-500">{errors.cover.message}</div>
            )}
          </div>

          <div className="flex flex-row justify-between mb-4">
            <button
              onClick={() => router.push('/eventCategory')}
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

export default EventUpload;
