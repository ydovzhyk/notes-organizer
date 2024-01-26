import React, { useState } from 'react';
import TextField from '../Shared/TextField';
import { fields } from '../Shared/TextField/fields'

import s from './UserList.module.scss'

export interface IUserList {
    arrayUser: string[];
    selectedUsers: string[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

const UserList: React.FC<IUserList> = ({ arrayUser, selectedUsers, setSelectedUsers }) => {
    const [finalListUser, setFinalListUser] = useState<string[]>(arrayUser);
    
    const [checkedUsers, setCheckedUsers] = useState<string[]>(selectedUsers.length > 0 ? selectedUsers[0].split(', ') : []);

    const handleUserSelection = (email: string) => {
        if (checkedUsers.includes(email)) {
            const processArray = checkedUsers.filter((user) => user !== email);
            setSelectedUsers([processArray.join(', ')]);
            setCheckedUsers(processArray);
        } else {
            const processArray = [...checkedUsers, email];
            setSelectedUsers([processArray.join(', ')]);
            setCheckedUsers(processArray);
        }
    };

    const handleTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        const filteredUsers = arrayUser.filter((email) => email.includes(text));
        if (arrayUser.length > 0) {
            setFinalListUser(filteredUsers);
        } else {
            setFinalListUser([text]);
        }
    };

    return (
        <>
        <TextField
            className="search"
            handleChange={handleTextSearch}
            {...fields.search}
        />
        <ul className={s.scroll}>
        {finalListUser.map((email, index) => (
            <li key={email} className={index === finalListUser.length - 1 ? s.lastListItem : s.list}>
                <label>
                    <input
                        type="checkbox"
                        className={s.checkbox}
                        checked={checkedUsers.includes(email)}
                        onChange={() => handleUserSelection(email)}
                    />
                    {email}
                </label>
            </li>
            ))}
            </ul>
        </>
    );
};

export default UserList;