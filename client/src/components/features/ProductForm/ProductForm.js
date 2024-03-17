import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { addProduct } from '../../../redux/productsSlice';
import { useDispatch } from 'react-redux';

const ProductForm = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(addProduct({ name, price, amount, description, file }));
    console.log({ name, price, amount, description, file });
  };

  return (
    <div>
      ProductForm
      <Form onSubmit={(e) => submitForm(e)} encType='multipart/form-data'>
        <Form.Group controlId='formGroupName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupPrice'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupAmount'>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type='number'
            onChange={(e) => setAmount(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupDescription'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            name='uploaded_file'
            as='textarea'
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupPicture'>
          <Form.Label>Picture</Form.Label>
          <Form.Control
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
            //   accept='image/jpeg'
          ></Form.Control>
        </Form.Group>
        <Button type='=submit'>Add Product</Button>
      </Form>
    </div>
  );
};

export default ProductForm;
