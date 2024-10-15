


import React, { useState } from "react";
import { useAppSelector,  } from "../../app/hooks";
import './style.scss';
import Modal from "react-modal";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from "react-redux";
import { addStudentToGroup, deleteStudentFromGroup, selectGroups } from "../../features/group/gruopSlice";
import { IGroup, IStudent } from "../../type/type";

const Group: React.FC = React.memo((): JSX.Element => {
    const {groups} = useAppSelector(selectGroups);
    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [addStudentModalIsOpen, setAddStudentModalIsOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);

    const openModal = (group: IGroup) => {
        setSelectedGroup(group);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedGroup(null);
    };

    const openAddStudentModal = (group: IGroup) => {
        setSelectedGroup(group);
        setAddStudentModalIsOpen(true);
    };

    const closeAddStudentModal = () => {
        setAddStudentModalIsOpen(false);
        setSelectedGroup(null);
    };

    const handleAddStudent = (values: { name: string; surname: string }) => {
        if (selectedGroup) {
            const newStudent: IStudent = {
                id: Date.now(),
                name: values.name,
                surname: values.surname
            };
            dispatch(addStudentToGroup({ groupId: selectedGroup.id, student: newStudent }));
            closeAddStudentModal();
        }
    };

    const handleDeleteStudent = (studentId: number) => {
        if (selectedGroup) {
            dispatch(deleteStudentFromGroup({ groupId: selectedGroup.id, studentId }));
        }
    };

    return (
        <div className="group">
            <h4>Groups</h4>
            <table className="group-table">
                <thead>
                    <tr>
                        <th>Group Name</th>
                        <th>Max Students</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group: IGroup) => (
                        <tr key={group.id}>
                            <td>{group.name}</td>
                            <td>{group.maxStudents}</td>
                            <td>
                                <button onClick={() => openModal(group)}>Show Students</button>
                                {group.students.length < group.maxStudents && (
                                    <button onClick={() => openAddStudentModal(group)}>Add Student</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <h4>Students in {selectedGroup?.name}</h4>
                <button onClick={closeModal}>Close</button>
                <div className="students-list">
                    {selectedGroup && selectedGroup.students.length > 0 ? (
                        <ul>
                            {selectedGroup.students.map((student: IStudent) => (
                                <li key={student.id}>
                                    {student.name} {student.surname}
                                    <button onClick={() => handleDeleteStudent(student.id)}>&times;</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No students in this group.</p>
                    )}
                </div>
            </Modal>

            <Modal isOpen={addStudentModalIsOpen} onRequestClose={closeAddStudentModal}>
                <h4>Add Student to {selectedGroup?.name}</h4>
                <Formik
                    initialValues={{ name: "", surname: "" }}
                    validationSchema={Yup.object({
                        name: Yup.string().required("Student name is required"),
                        surname: Yup.string().required("Student surname is required")
                    })}
                    onSubmit={handleAddStudent}
                >
                    {() => (
                        <Form>
                            <div>
                                <Field type="text" name="name" placeholder="Student Name" />
                                <ErrorMessage name="name" component="span" className="error" />
                            </div>
                            <div>
                                <Field type="text" name="surname" placeholder="Student Surname" />
                                <ErrorMessage name="surname" component="span" className="error" />
                            </div>
                            <button type="submit">Add Student</button>
                        </Form>
                    )}
                </Formik>
                <button onClick={closeAddStudentModal}>Cancel</button>
            </Modal>
        </div>
    );
});

export default Group;
