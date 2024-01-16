import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import EventWizard from '@/components/EventWizard';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { Store } from '@/utils/store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '@/utils/error';
import Loader from '@/components/loader/Loader';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' };
    case 'FETCH_FILER':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function CreateEvent() {
  const { data: session } = useSession();
  const router = useRouter();
  const [{ loading, error, users }, dispatch1] = useReducer(reducer, {
    loading: true,
    error: '',
    users: {},
  });
  console.log(loading, users, error);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const { state, dispatch } = useContext(Store);
  const { ticket } = state;
  const { createEvent } = ticket;
  useEffect(() => {
    if (session?.user?.email) {
      const findUser = async () => {
        try {
          dispatch1({ type: 'FETCH_REQUEST' });
          const res = await axios.get('/api/user');

          dispatch1({ type: 'FETCH_SUCCESS', payload: res.data });
        } catch (error) {
          console.log(error);
          dispatch1({ type: 'FETCH_FILER', payload: getError(error) });
          toast.error(getError(error));
        }
      };
      findUser();
    }
    setValue('title', createEvent?.title);
    setValue('address', createEvent?.address);
    setValue('description', createEvent?.description);
    setValue('price', createEvent?.price);
    setValue('total', createEvent?.total);
  }, [setValue, createEvent, session?.user?.email]);
  const submitHandler = ({ title, address, description, price, total }) => {
    console.log(title, address, description, price, total);
    dispatch({
      type: 'Save_Create_Event',
      payload: { title, address, description, price, total },
    });

    router.push('/eventCategory');
  };
  if (!users?.isAdmin) {
    if (users?.userType === 'All') {
      router.push('/choosePrice');
    }
  }
  return (
    <div>
      {loading === true ? (
        <>
          <Loader />
        </>
      ) : (
        <Layout title="create">
          <div className="container h-screen px-4 m-auto mt-4 jio">
            <EventWizard activeStep={1} />
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="max-w-screen-md mx-auto"
            >
              <h1 className="mb-4 text-xl">Create Event</h1>
              <div className="mb-4">
                <label htmlFor="fullName">Event Title</label>
                <input
                  id="title"
                  autoFocus
                  className="w-full"
                  {...register('title', {
                    required: 'Please Enter Event title',
                  })}
                />
                {errors.title && (
                  <div className="text-red-500">{errors.title.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="address">Location</label>
                <input
                  id="address "
                  className="w-full"
                  {...register('address', {
                    required: 'Please Enter Event address',
                    minLength: {
                      value: 3,
                      message: 'Address is more than 2 char',
                    },
                  })}
                />
                {errors.address && (
                  <div className="text-red-500">{errors.address.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="desc">Description</label>
                <textarea
                  id="description "
                  className="w-full"
                  {...register('description', {
                    required: 'Please Enter your Description of event',
                    minLength: {
                      value: 10,
                      message: 'description is more than 10 char',
                    },
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="price">Ticket price</label>
                <input
                  id="price"
                  type="number"
                  className="w-full"
                  placeholder="Enter 0 for Free Ticket"
                  {...register('price', {
                    required: 'Please Enter  ticket price',
                  })}
                />
                {errors.price && (
                  <div className="text-red-500">{errors.price.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="Total">Total Ticket</label>
                <input
                  id="total"
                  type="number"
                  className="w-full"
                  {...register('total', {
                    required: 'Please Enter total ticket available',
                  })}
                />
                {errors.total && (
                  <div className="text-red-500">{errors.total.message}</div>
                )}
              </div>
              <div className="flex flex-row-reverse justify-between mb-4">
                <button className="primary-button">Next</button>
              </div>
            </form>
          </div>
        </Layout>
      )}
    </div>
  );
}

export default CreateEvent;

CreateEvent.auth = true;
