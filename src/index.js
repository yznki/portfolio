import React from 'react';
import ReactDOM from 'react-dom/client';

import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Index = () => {
  return (
    <div className='soon'>Coming Soon...</div>
  )
}
export default Index

ReactDOM.createRoot(document.getElementById('root')).render(<Index />);