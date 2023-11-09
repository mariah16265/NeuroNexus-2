import React from 'react';
import { Col, Row } from 'react-bootstrap';
//type rfc then tab, for default template
export default function CheckoutSteps(props) {
  //props.step1 likely indicates whether the user has completed the first step of the checkout process (in this case, signing in). If step1 is true, it means the user has completed this step, and the corresponding column will be marked as 'active'.
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
      <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
      <Col className={props.step3 ? 'active' : ''}>Payment</Col>
      <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
    </Row>
  );
  return <div></div>;
}
