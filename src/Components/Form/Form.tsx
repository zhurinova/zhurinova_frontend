import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ExhibitForm = ({ initialData, onSubmit }) => {
  const ExhibitSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    yearOfCreation: Yup.number().required('Year is required').positive().integer(),
    price: Yup.number().required('Price is required').positive(),
    technique: Yup.string().required('Technique is required'),
    artistId: Yup.number().nullable(),
  });

  return (
    <Formik
      initialValues={initialData || {
        title: '',
        yearOfCreation: '',
        price: '',
        technique: '',
        artistId: '',
      }}
      validationSchema={ExhibitSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label>Title</label>
            <Field name="title" />
            {errors.title && touched.title && <div>{String(errors.title)}</div>}
          </div>
          <div>
            <label>Year of Creation</label>
            <Field name="yearOfCreation" type="number" />
            {errors.yearOfCreation && touched.yearOfCreation && <div>{String(errors.yearOfCreation)}</div>}
          </div>
          <div>
            <label>Price</label>
            <Field name="price" type="number" />
            {errors.price && touched.price && <div>{String(errors.price)}</div>}
          </div>
          <div>
            <label>Technique</label>
            <Field name="technique" />
            {errors.technique && touched.technique && <div>{String(errors.technique)}</div>}
          </div>
          <div>
            <label>Artist ID (Optional)</label>
            <Field name="artistId" type="number" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default ExhibitForm;
