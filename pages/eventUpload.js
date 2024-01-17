import EventWizard from '@/components/EventWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/store';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '@/utils/error';
import Cookies from 'js-cookie';

function EventUpload() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { ticket } = state;
  const { createEvent } = ticket;
  const submitHandler = async (data) => {
    console.log(data.file[0]);
    const file = data.file[0];
    try {
      dispatch({
        type: 'Save_Create_Event',
        payload: { file },
      });
      setLoading(true);
      await axios.post('/api/event/ne', {
        createEvent,
      });
      setLoading(false);
      toast.success('Create Event Successfully');
      router.push('/');
      Cookies.set(
        'ticket',
        JSON.stringify({
          ...ticket,
          createEvent: {},
        })
      );
    } catch (error) {
      setLoading(false);
      toast.error(getError('Create Event is Failed'));
    }
  };
  useEffect(() => {
    if (!createEvent?.address) {
      router.push('/createEvent');
    }
    setValue('cover', createEvent?.cover);
  }, [setValue, createEvent, router]);
  return (
    <Layout title="upload">
      <div className="container h-screen px-4 m-auto mt-4">
        <EventWizard activeStep={3} />
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="max-w-screen-md mx-auto"
        >
          <h1 className="mb-4 text-xl">Upload</h1>
          <div className="mb-4">
            <label className="my-2" htmlFor="file">
              cover picture
            </label>
            <input
              type="file"
              name="file"
              {...register('file', { required: 'File is required.' })}
            />
            {errors.file && <p>{errors.file.message}</p>}
          </div>

          <div className="flex flex-row justify-between mb-4">
            <button
              onClick={() => router.push('/eventCategory')}
              className="default-button"
              type="button"
            >
              Back
            </button>
            <button className="primary-button " type="submit">
              {loading === true ? <div>loading ...</div> : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default EventUpload;
