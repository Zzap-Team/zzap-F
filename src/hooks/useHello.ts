/*
    샘플코드
*/

import { useState } from 'react';

export function useHello(): [string, () => void] {
  const [hello, setHello] = useState<string>('Hello');
  const sayHello = () => console.log('Hello!');

  return [hello, sayHello];
}
