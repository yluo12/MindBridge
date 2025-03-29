'use client';

import { useState } from 'react';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, } from '../../utils/auth';
import { LOCK_ICON, USER_ICON, GOOGLE_ICON } from '../../../public/Icons/ReactIconsImport';

export default function AuthPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('email', email);
    console.log('password', password);
    // const { user, error } = await signInWithEmail(email, password);
    // if (error) {
    //   console.error(error.message);
    // } else {
    //   // handle successful sign-in
    //   alert('Signed in successfully!');
    // }
  };

  return (
    <div className='w-screen h-screen bg-gradient-to-r from-ivoryBreeze via-softPink to-deepBlue flex justify-center items-center shadow relative'>
      <div className='w-[460px] h-[500px] bg-white opacity-65 border border-white rounded-lg '>
      </div>
      <div className='w-[460px] h-[500px] px-8 absolute flex flex-col items-center text-deepBlue'>
        <h1 className='font-bold text-2xl mt-14'>{isLogin ? 'Log In' : 'Sign Up'}</h1>
        <form onSubmit={handleSignIn}
          className='w-full flex flex-col gap-4 mt-10'>
          <div className='relative w-full'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className='px-4 py-2 bg-gray-200 rounded-lg w-full'
            />
            <span className='absolute text-gray-400 top-3 right-4'>{USER_ICON}</span>
          </div>
          <div className='relative w-full mt-2'>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className='px-4 py-2 bg-gray-200 rounded-lg w-full'
            />
            <span className='absolute text-gray-400 top-3 right-4'>{LOCK_ICON}</span>
          </div>
          <button
            type='submit'
            className='bg-driftwood hover:bg-driftwoodHover text-white text-lg px-4 py-1.5 font-bold rounded-lg shadow mt-4 cursor-pointer'
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
          <div className='flex justify-center gap-2 text-sm text-gray-400'>
            <span>{`Don't have an account?`}</span>
            <button className='font-bold cursor-pointer text-sm hover:text-gray-600'
              onClick={() => setIsLogin(false)}>Register</button>
          </div>
        </form>
        <div className='w-full mt-8 flex flex-col justify-center gap-2 relative'>
          <span className='text-gray-300 text-sm mx-auto mb-2'>--------------- Or ---------------</span>
          <button className='bg-white cursor-pointer border border-gray-200 px-4 py-2 rounded-lg shadow'>Continue with Google</button>
          <span className='absolute top-12 left-18 text-lg'>{GOOGLE_ICON}</span>
        </div>
      </div>
    </div>
  );
}