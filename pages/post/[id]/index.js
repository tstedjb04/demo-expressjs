import React, { useEffect, useState, Fragment } from 'react';
import Router from 'next/router';

const Index = ({ id }) => {
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

Index.getInitialProps = async router => {
  const { id } = router.query;
  return { id };
};

export default Index;