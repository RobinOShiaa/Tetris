import { useEffect, useRef } from 'react';

export function useDropTime(cb, time) {
  const refcb = useRef();
  useEffect(() => {
    refcb.current = cb;
  }, [cb]);


  useEffect(() => {
    if (time !== null) {
      const id = setInterval(() => refcb.current(), time);
      return () => {
        clearInterval(id);
      };
    }
  }, [time]);
}
