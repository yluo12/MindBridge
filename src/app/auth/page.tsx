'use client';

import { useState } from 'react';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, } from '../../utils/auth';
import { LOCK_ICON, USER_ICON, GOOGLE_ICON, WARNING_ICON, ERROR_ICON } from '../../../public/Icons/ReactIconsImport';

export default function AuthPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [pwdError, setPwdError] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const clickHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (email === '') {
      setEmailError('empty');
      return;
    } else if (!email.includes('@') && !email.includes('.com')) {
      setEmailError('invalid');
      return;
    }
    if (password === '') {
      setPwdError('empty');
      return;
    } else if (password.length < 6) {
      setPwdError('invalid');
      return;
    }

    if (isLogin) {
      const { user, error } = await signInWithEmail(email, password);
      if (error) {
        setLoginError(true);
        console.log('login error: ', error);
        console.error(error.message);
      } else {
        // handle successful sign-in
        console.log('user info here: ', user);
        alert('Signed in successfully!');
      }
    } else {
      const { user, error } = await signUpWithEmail(email, password);
      if (error) {
        console.log('sign up error: ', error);
        console.error(error.message);
      } else {
        // handle successful sign-in
        console.log('user info here: ', user);
        alert('Signed up successfully!'); // redirect to user home page
      }
    }
  };

  const registerHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLogin((prev) => !prev);
    setEmail('');
    setPassword('');
  };

  const getErrors = (errorMessage: string, type: string) => {
    let message = '';
    if (errorMessage === 'empty' && type === 'email') {
      message = 'Email cannot be empty.';
    } else if (errorMessage === 'invalid' && type === 'email') {
      message = 'Please enter a valid email address.';
    } else if (errorMessage === 'invalid' && type === 'password') {
      message = 'Passwords must be six or more characters.';
    } else if (errorMessage === 'empty' && type === 'password') {
      message = 'Password cannot be empty.';
    } else {
      message = '';
    }
    if (message) {
      return <div className='flex flex-row gap-2 text-red-400 mt-1'>
        <span>{WARNING_ICON}</span>
        <span className='text-xs'>{message}</span>
      </div>;
    } else {
      return null;
    }
  };

  return (
    <div className='w-screen h-screen bg-gradient-to-r from-ivoryBreeze via-softPink to-deepBlue flex justify-center items-center shadow relative'>
      <div className='w-[460px] h-[560px] bg-white opacity-65 border border-white rounded-lg '>
      </div>
      <div className='w-[460px] h-[500px] px-8 absolute flex flex-col items-center text-deepBlue'>
        <h1 className='font-bold text-2xl mt-10'>{isLogin ? 'Log In' : 'Sign Up'}</h1>
        <form
          className='w-full flex flex-col gap-4 mt-8'>
          {loginError && <div className='bg-red-100 text-sm text-red-400 flex flex-row gap-2 p-2 rounded-lg'>
            <span>{ERROR_ICON}</span>
            <span>Either your email address or password is incorrect. Please try again.</span>
          </div>}
          <div className='relative w-full'>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              placeholder="Email"
              className='px-4 py-2 bg-gray-200 rounded-lg w-full'
            />
            <span className='absolute text-gray-400 top-3 right-4'>{USER_ICON}</span>
            {getErrors(emailError, 'email')}
          </div>
          <div className='relative w-full mt-2'>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPwdError('');
              }}
              placeholder="Password"
              className='px-4 py-2 bg-gray-200 rounded-lg w-full'
            />
            <span className='absolute text-gray-400 top-3 right-4'>{LOCK_ICON}</span>
            {getErrors(pwdError, 'password')}
          </div>
          <button
            onClick={clickHandler}
            className='bg-driftwood hover:bg-driftwoodHover text-white text-lg px-4 py-1.5 font-bold rounded-lg shadow mt-4 cursor-pointer'
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
          <div className='flex justify-center gap-2 text-sm text-gray-400'>
            <span>{isLogin ? `Don't have an account?` : 'Already on MindBridge?'}</span>
            <button className='font-bold cursor-pointer text-sm hover:text-gray-600'
              onClick={registerHandler}>{isLogin ? 'Register' : 'Log In'}</button>
          </div>
        </form>
        <div className='w-full mt-6 flex flex-col justify-center gap-2 relative'>
          <span className='text-gray-300 text-sm mx-auto mb-2'>------------------------------ Or ------------------------------</span>
          <button className='bg-white cursor-pointer border border-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-100'>Continue with Google</button>
          <span className='absolute top-12 left-18 text-lg'>{GOOGLE_ICON}</span>
        </div>
      </div>
    </div>
  );
}