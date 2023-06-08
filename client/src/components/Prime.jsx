import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_DOMAIN } from '../constants/constants';
import { useEffect, useState } from 'react';

const Prime = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [primes, setPrimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${API_DOMAIN}/api/prime/${params.number}`
        );
        setPrimes(response.data);
      } catch (err) {
        navigate('/');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    primes.length !== 0 ? setLoading(false) : setLoading(true);
  }, [primes]);

  return (
    <div className={`${loading && 'h-[100vh] overflow-hidden'}`}>
      <h2 className="flex flex-row flex-nowrap items-center my-8">
        <span className="flex-grow block border-t border-black"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-xl leading-none font-medium bg-black text-white">
          PRIMES TILL &quot;{params.number}&quot;
        </span>
        <span className="flex-grow block border-t border-black"></span>
      </h2>
      {loading ? (
        <div className="flex flex-wrap">
          {Array.apply(null, { length: 200 }).map((e, i) => (
            <div
              key={i}
              className={`flex flex-wrap items-center justify-center bg-gray-200 rounded-full m-1 w-16 h-16`}
            >
              <span className={`font-bold`}></span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap">
          {primes.map((num) => {
            const numDigits = num.toString().length;
            const fontSize = numDigits <= 4 ? 'text-xl' : 'text-lg';
            return (
              <div
                key={num}
                className={`flex flex-wrap items-center justify-center bg-gray-200 rounded-full m-1 w-16 h-16`}
              >
                <span className={`font-bold ${fontSize}`}>{num}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Prime;
