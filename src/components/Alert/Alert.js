import { useEffect, useState } from "react";

export default function Alert(props) {


  // // HOW TO MAKE Alert display for 10 sec
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    // Set alert to true to display it
    setAlert(true);

    // After 10 seconds, hide the alert
    const timeoutId = setTimeout(() => {
      setAlert(false);
    }, 5000); // 10000 milliseconds = 10 seconds

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [props.message]);
  // // The  Handle Message as Alert
  return (
    <>
      {alert && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 border p-4 rounded-2xl bg-white  text-green-600 font-bold shadow-md">
          <h2> {props.message} </h2>
        </div>
      )}
    </>
  );
}
