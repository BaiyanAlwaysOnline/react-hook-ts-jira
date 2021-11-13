import React, {useEffect, useState} from 'react';
import {useDebounce} from "utils/hooks";

function App() {
  const [value, setValue] = useState('');
  const debounceValue = useDebounce<string>(value, 200);
  useEffect(() => {
      console.log('submit', debounceValue)
  }, [debounceValue])
  return (
    <div className="App">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

export default App;
