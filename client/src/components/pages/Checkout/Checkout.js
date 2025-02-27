import { useState } from 'react';
import CartProducts from '../../features/CartProducts/CartProducts';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const Checkout = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>checkout</div>
      <CartProducts></CartProducts>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formGroupFirstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupLastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupCountry'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupZipCode'>
          <Form.Label>Zip code</Form.Label>
          <Form.Control
            type='text'
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupCity'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupStreet'>
          <Form.Label>Street</Form.Label>
          <Form.Control
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupEmail'>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type='text'
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupPhone'>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit'>Confirm and pay</Button>
      </Form>
      <div>
        payment options:
        <div>Card</div>
        <div>PayPal</div>
      </div>
    </div>
  );
};

export default Checkout;
