import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const OrderForm = ({ initialData, onSubmit }) => {
  const OrderSchema = Yup.object().shape({
    price: Yup.number().required('Price is required').positive().integer(),
    status: Yup.string().required('Status is required'),
    dateTime: Yup.string().required('DateTime is required'),
    customerId: Yup.number().nullable(),
  });

  return (
    <Formik
      initialValues={initialData || {
        price: '',
        status: '',
        dateTime: '',
        customerId: '',
      }}
      validationSchema={OrderSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label>Price</label>
            <Field name="price" type="number" />
            {errors.price && touched.price && <div>{String(errors.price)}</div>}
          </div>
          <div>
            <label>Status</label>
            <Field name="status" />
            {errors.status && touched.status && <div>{String(errors.status)}</div>}
          </div>
          <div>
            <label>DatetTime</label>
            <Field name="dateTime" />
            {errors.dateTime && touched.dateTime && <div>{String(errors.dateTime)}</div>}
          </div>
          <div>
            <label>Customer ID (Optional)</label>
            <Field name="customerId" type="number" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
