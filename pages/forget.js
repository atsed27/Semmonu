import Layout from '@/components/Layout';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '@/utils/error';
import { useRouter } from 'next/router';
function Forget() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email }) => {
    console.log(email);
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/finduser', {
        email,
      });
      console.log(res);
      router.push('/');
      setLoading(false);
    } catch (error) {
      if (error.response.data === 'email is not found') {
        toast.error(error.response.data);
        setLoading(false);
        return;
      }
      toast.error(getError(error));
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container px-4 m-auto mt-4 ">
        <Link href={'/login'}>back</Link>
        <div className="flex flex-col items-center justify-center">
          <p></p>
          <form
            className="px-5 py-5 mx-2 mt-16 mb-5 rounded-lg shadow-xl sm:mt-24 lg:mt-36 shadow-gray-200"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="py-2 text-xl font-bold">Forgot Your Password ? </h1>
            <div className="mt-2 mb-4">
              <label className="my-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Please enter your email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter valid email address',
                  },
                })}
                className="w-full rounded"
                id="email"
                placeholder="place Enter your Email"
                autoFocus
              />
              {errors.email && (
                <div className="text-red-600"> {errors.email.message} </div>
              )}
            </div>
            <div className="mb-5 bg-primary">
              <h3 className="text-center">
                <button className="px-10 py-1 text-xl font-semibold">
                  {loading === true ? <div>Loading ... </div> : 'Forgot'}
                </button>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Forget;
