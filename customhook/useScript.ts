import { useEffect } from 'react';

const useScript = (url: string, isContent = false) => {
  useEffect(() => {
    const script = document.createElement('script');

    if (isContent) {
      script.innerHTML = url;
    } else {
      script.src = url;
      script.async = true;
    }

    document.body.appendChild(script);

    return () => {
      document?.querySelector('[id^="ot-widget-"]')?.remove();
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
