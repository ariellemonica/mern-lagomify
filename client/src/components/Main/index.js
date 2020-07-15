import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';

export default function Main (props) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        {props.children}
      </Container>
    </>
  );
}
