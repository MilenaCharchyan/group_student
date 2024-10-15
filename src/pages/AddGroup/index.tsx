import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import './style.scss';
import { addGroup } from "../../features/group/gruopSlice";

const validationSchema = Yup.object({
    name: Yup.string().required("Group name is required"),
    maxStudents: Yup.number()
        .required("Maximum number of students is required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
});
const AddGroup: React.FC = React.memo((): JSX.Element => {
    const dispatch = useDispatch();

    const handleAddGroup = (values: { name: string; maxStudents: number }) => {
        console.log(values);
        
        dispatch(addGroup({ ...values, id: Date.now(), students:[] }));
    };

    return (
        <div className="add-group-container">
            <h4>Add Group</h4>
            <Formik
                initialValues={{ name: "", maxStudents: 0 }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleAddGroup(values);
                    resetForm();
                }}
            >
                {() => (
                    <Form>
                        <div>
                            <Field type="text" name="name" placeholder="Group Name" className="input" />
                            <ErrorMessage name="name" component="span" className="error" />
                        </div>
                        <div>
                            <Field type="number" name="maxStudents" placeholder="Max Students" className="input" />
                            <ErrorMessage name="maxStudents" component="span" className="error" />
                        </div>
                        <button type="submit" className="add-group-btn">Add Group</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
});
export default AddGroup