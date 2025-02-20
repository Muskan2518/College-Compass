import React, { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import Loading from './components/Loading/Loading';
import Header from './components/header/Header';
import { useLoading } from './components/hooks/useLoading';
import { setLoadingInterceptor } from './interceptors/loadingInterceptors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, [showLoading, hideLoading]);

  return (
    <>
      <Loading />
      <Header />
      <AppRoutes />
      <ToastContainer /> {/* To display toast notifications */}
    </>
  );
}

export default App;
