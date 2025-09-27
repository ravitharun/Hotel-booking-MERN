import React, { useState } from "react";
import UserLoader from "../Loader/USerLoader";
function Higher(WrappedComponent) {
  return function EnhancedComponent(props) {
    const [loading, setLoading] = useState(true); // loader state
    if (loading) {
      return (
        <>
          <UserLoader></UserLoader>
        </>
      );
    }

    return (
      <div>
        <WrappedComponent {...props} message="Hello from HOC!" />
      </div>
    );
  };
}
export default Higher;
