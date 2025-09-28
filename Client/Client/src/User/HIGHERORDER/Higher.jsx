import React, { useState } from "react";
import UserLoader from "../Loader/USerLoader";
function Higher(WrappedComponent) {
  return function EnhancedComponent(props) {
    console.log({...props},'props')
    const [loading, setLoading] = useState(false); // loader state

    return (
      <>

        <WrappedComponent {...props} message="Hello from HOC!" />
        <h3>Adding new fwatures</h3>
      
      </>
    );
  };
}
export default Higher;
