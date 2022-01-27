import { useState, useEffect } from 'react';

function useTitle() {
  const [title, setTitle] = useState('Biseo');
  const updateTitle = () => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerText = title;
  };

  useEffect(updateTitle, [title]);
  return setTitle;
}

export default useTitle;
