import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthCallBack = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const route = localStorage.getItem('prevPathname') || '/';
      router.replace(route);
    }, 500);
  }, []);

  return <h2 style={{ marginLeft: 12 }}>Redirecting...</h2>;
};

export default AuthCallBack;
