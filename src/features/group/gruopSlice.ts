import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddGroupFormValues, IGroup, IStudent } from "../../type/type";
import { RootState } from "../../app/store";

interface GroupState {
    groups: IGroup[];
}

const initialState: GroupState = {
    groups: [
        {
            id: 1,
            name: "Group 1",
            maxStudents: 5,
            students: [
                { id: 1, name: "John", surname: "Doe" },
                { id: 2, name: "John2", surname: "Doe2" },
            ]
        },
        { 
            id: 2, 
            name: "Group 2", 
            maxStudents: 3, 
            students: [
                { id: 1, name: "Jane1", surname: "Smith" },
                { id: 2, name: "Jane2", surname: "Smith" },
                { id: 3, name: "Jane3", surname: "Smith" },
            ] 
        }
    ],
};

const groupSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        addGroup: (state, action) => {
            state.groups.push(action.payload);
        },
        addStudentToGroup: (
            state,
            action: PayloadAction<{ groupId: number; student: IStudent }>
        ) => {
            const group = state.groups.find((group) => group.id === action.payload.groupId);
            if (group && group.students.length < group.maxStudents) {
                group.students.push(action.payload.student);
            }
        },
        deleteStudentFromGroup: (
            state,
            action: PayloadAction<{ groupId: number; studentId: number }>
        ) => {
            const group = state.groups.find((group) => group.id === action.payload.groupId);
            if (group) {
                group.students = group.students.filter(
                    (student) => student.id !== action.payload.studentId
                );
            }
        },
        deleteGroup: (state, action: PayloadAction<number>) => {
            state.groups = state.groups.filter((group) => group.id !== action.payload);
        },
    },
});

export const { addGroup, addStudentToGroup, deleteStudentFromGroup, deleteGroup } = groupSlice.actions;
export const selectGroups = (state: RootState) => state.group;
export default groupSlice.reducer;


