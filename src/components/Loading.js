import {useEffect, useState} from "react"

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  // ================ THIS FOR STOP SCROLL WHENl LOADING  =============
  const stopScroll = () => {
    if (isLoading) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  };
  useEffect(() => {
    stopScroll();
  }, [isLoading]);
  // SO I AM LINKING THE stopScroll WITH CHANGE <isLoading>  THAT CHANGE WHEN project (loading) display on screen
  // =======================================================================

  
  return (
    <div className="bg-loader">
      <div className="loader"> </div>
      <div className="loadingInner">
        Loading ...
      </div>
    </div>
  );
}
