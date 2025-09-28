import React, { useState } from "react";
import UserLoader from "../Loader/USerLoader";
import Footer from "../Footer";
function Higher(WrappedComponent,withFooter=true) {
  return function EnhancedComponent(props) {
    console.log({...props},'props')
    const [loading, setLoading] = useState(false); // loader state

    return (
      <>

        <WrappedComponent {...props} message="Hello from HOC!" />
       {withFooter && <h3>Adding new fwatures</h3>}
            {withFooter && <Footer />} {/* 👈 conditional */}
                      <nav className='d-flex'>
            <ul>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
            </ul>
          </nav>
      </>
    );
  };
}
export default Higher;
