'use client'

import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { db } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Form validation schema
const validationSchema = object().shape({
  category: string().required("Please select a category"),
  link: string().required("Please Enter a link"),
  name: string().required("Please Enter a name"),
});

export default function Edit({ params }) {
  const { id } = params;
  const [linksData, setLinksData] = useState(null);
  const router = useRouter();


  const fetchLinks = async () => {
    try {
      const linkDoc = await getDoc(doc(db, "links", id));

      if (linkDoc.exists()) {
        setLinksData(linkDoc.data());
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [id]);

  // Initial values based on fetched data
  const initialValues = {
    name: linksData?.name || "",
    category: linksData?.category || "",
    link: linksData?.link || "",
  };

  // Handle form submission for updating the link
  const handleSubmit = async (values, formikHelpers) => {
    try {
      const docRef = doc(db, "links", id);
      await updateDoc(docRef, {
        name: values.name,
        category: values.category.toLowerCase(),
        link: values.link,
      });

      router.push("/dashboard"); 
    } catch (error) {
      console.error("Error updating link:", error);
    }

    formikHelpers.resetForm();
  };

  return (
    <div className="form-container">
      <h3>Update Links</h3>

      {linksData ? (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
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
                error={Boolean(errors.category) && Boolean(touched.category)}
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
                error={Boolean(errors.name) && Boolean(touched.name)}
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
                error={Boolean(errors.link) && Boolean(touched.link)}
                helperText={Boolean(touched.link) && errors.link}
              />

              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <p>Loading...</p> 
      )}
    </div>
  );
}
