import { useState } from 'react';


// MyButtonを2回呼び出しているがカウントは連動していない、それぞれが独自のstateを持つ
export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

// useStateのようにuseで始まる関数は組み込みフック(Hook)である
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
