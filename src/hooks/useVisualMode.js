import { useState } from "react";

function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, replace = false) => {
    if (newMode !== mode) {
      setMode(newMode);
      (replace ? 
        newMode = history[history.length - 1] 
        : setHistory(prev => ([...prev, newMode]))
      );
    }
    
  }

  const back = () => {

    if (history.length > 1) {
      history.pop();
      setHistory([...history]);
      setMode(history[history.length - 1]);

      // let historyNew = [...history];
      // historyNew.pop();
      // console.log(history, 'Before', historyNew);
      // setHistory([ ...historyNew ]);
      // console.log(history, 'after', historyNew);
      // setMode(history[history.length - 1]);
    }
  }

  return { mode , transition, back};
}
export default useVisualMode;