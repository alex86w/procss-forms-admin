import { useState } from 'react';

export default () => {
  const [signData, setSign] = useState(null);

  return {
    signData,
    setSign,
  };
};
