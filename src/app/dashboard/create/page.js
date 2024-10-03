
'use client'

import { Button, MenuItem, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Sample data


// Form validation schema
const validationSchema = object().shape({
  category: string().required("Please select a category"),
  link: string().required("Please Enter a link"),
  name: string().required("Please Enter a name"),
});

export default function CreateLink() {

  const router = useRouter()

  const initialValues = {
    name: "",
    category: "",
    link: "",
  };

  const handleSubmit = async (values, formikHelpers) => {
 
   try {
    const res = await addDoc(collection(db, "links"), {
      name: values.name,
      category: values.category.toLocaleLowerCase(),
      link: values.link,
    });

    router.push("/dashboard")
    console.log(res)
   } catch (error) {
    console.log(error)
   }
    formikHelpers.resetForm();
  };

  return (
    <div className="form-container">
      <h3>Create Links</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched }) => (
          <Form className="list-form">
          
          
          <Field
                  name="category"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Category"
                  fullWidth
                  error={
                    Boolean(errors.category) && Boolean(touched.category)
                  }
                  helperText={Boolean(touched.category) && errors.category}
                />

<Field
                  name="name"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Name"
                  fullWidth
                  error={
                    Boolean(errors.name) && Boolean(touched.name)
                  }
                  helperText={Boolean(touched.name) && errors.name}
                />


         
            <Field
                  name="link"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Link"
                  fullWidth
                  error={
                    Boolean(errors.link) && Boolean(touched.link)
                  }
                  helperText={Boolean(touched.link) && errors.link}
                />


            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
