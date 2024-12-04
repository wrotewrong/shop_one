import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProducts, editProducts } from '../../../redux/productsSlice';

const ProductForm = (props) => {
  const [name, setName] = useState(props.name || '');
  const [price, setPrice] = useState(props.price || '');
  const [amount, setAmount] = useState(props.amount || '');
  const [description, setDescription] = useState(props.description || '');
  const [file, setFile] = useState(props.img || null);
  const dispatch = useDispatch();
  const { action } = props;

  const submitForm = (e) => {
    e.preventDefault();
    if (action === 'add') {
      dispatch(addProducts({ name, price, amount, description, file }));
    } else {
      console.log('edited');
      dispatch(
        editProducts({ id: props._id, name, price, amount, description, file })
      );
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupPrice'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupAmount'>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='formGroupDescription'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            // name='uploaded_file'
            as='textarea'
            value={description}
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
        <Button type='=submit'>
          {action === 'add' ? 'Add' : 'Edit'} product
        </Button>
      </Form>
    </div>
  );
};

export default ProductForm;
