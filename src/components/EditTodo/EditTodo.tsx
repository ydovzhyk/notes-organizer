import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { useAppDispatch } from '../../hooks/hooks';
import { useMediaQuery } from 'react-responsive';
import { editTodo } from '../../Redux/todo/todo-operations';
import { getLogin } from '../../Redux/auth/auth-selectors';
import { getEditTodo } from '../../Redux/todo/todo-operations';
import { getEditTodoStore } from '../../Redux/todo/todo-selectors';
import { getTodoMessage } from '../../Redux/todo/todo-selectors'
import { clearTodoMessage, createMessageConfirmation, saveEditTodo } from '../../Redux/todo/todo-slice';
import { getEmailList } from '../../Redux/technical/technical-selectors';
import { getOptionMenu } from '../../Redux/technical/technical-selectors';
import Container from '../Shared/Container';
import Calendar from '../Shared/Calendar';
import SelectField from '../Shared/SelectField';
import Button from '../Shared/Button';
import Text from '../Shared/Text';
import TextField from '../Shared/TextField';
import UserList from '../../components/CreateTodo/UserList';
import Todo from '../Todo/Todo';
import Message from '../Shared/Message';
import { fields } from '../Shared/TextField/fields'
import { ITodoCreate } from '../types/todo/todo';
import { FaPlus } from 'react-icons/fa';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITodoPrewievProps } from '../TodoPreview/TodoPreview';

import s from './EditTodo.module.scss';

interface EditTodoProps {
    todoData: ITodoPrewievProps;
}

const EditTodo: React.FC<EditTodoProps> = ({ todoData }) => {

    const { id } = useParams();
    const format = "DD.MM.YYYY";
    const currentDate = moment().format('DD.MM.YYYY');

    const vpHeight = window.innerHeight;
    const [dynamicStyles, setDynamicStyles] = useState({});
    const [isShowPreviewInMobile, setIsShowPreviewInMobile] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const [partInitial, setPartInitial] = useState<string>('');
    const [_idInitial, set_idInitial] = useState<string>('');

    const initialState = {
        additionalInfo: '',
        dateFrom: currentDate,
        dateTo: currentDate,
        otherMembers: '',
        part: '',
        subject: '',
        saveAfterDeadline: false,
    }

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isUserLogin = useSelector(getLogin);
    const editTodoStore = useSelector(getEditTodoStore);
    const arrayUser = useSelector(getEmailList);
    const options = useSelector(getOptionMenu);
    const message = useSelector(getTodoMessage);
    const [showUsersList, setShowUsersList] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    
    const [selectedDateFrom, setSelectedDateFrom] = useState<Moment>(moment(currentDate, format));
    const [selectedDateTo, setSelectedDateTo] = useState<Moment>(moment(currentDate, format));
    
    const [previewData, setPreviewData] = useState(initialState);

    const { control, handleSubmit, reset } = useForm<ITodoCreate>({
        defaultValues: {
            additionalInfo: previewData.additionalInfo,
            dateFrom: previewData.dateFrom,
            dateTo: previewData.dateTo,
            otherMembers: previewData.otherMembers,
            part: { value: previewData.part, label: previewData.part },
            subject: previewData.subject,
            saveAfterDeadline: previewData.saveAfterDeadline,
        },
    });

    useEffect(() => {
        const updatePreviewData = async (data: any) => {
            await setPreviewData({
                ...data,
            });
        }
        if (todoData && Object.keys(todoData).length > 0) {
            updatePreviewData(todoData);
            reset({
                additionalInfo: todoData.additionalInfo,
                dateFrom: todoData.dateFrom,
                dateTo: todoData.dateTo,
                otherMembers: todoData.otherMembers,
                part: { value: todoData.part, label: todoData.part },
                subject: todoData.subject,
                saveAfterDeadline: todoData.saveAfterDeadline,
            });
            setSelectedDateFrom(moment(todoData.dateFrom, format));
            setSelectedDateTo(moment(todoData.dateTo, format));
            setSelectedUsers([todoData.otherMembers]);
            setPartInitial(todoData.part);
            set_idInitial(todoData._id);
        }
        if (!todoData && editTodoStore && Object.keys(editTodoStore).length > 0) {
            updatePreviewData(editTodoStore);
            if ('_id' in editTodoStore) {
                reset({
                    additionalInfo: editTodoStore.additionalInfo,
                    dateFrom: editTodoStore.dateFrom,
                    dateTo: editTodoStore.dateTo,
                    otherMembers: editTodoStore.otherMembers,
                    part: { value: editTodoStore.part, label: editTodoStore.part },
                    subject: editTodoStore.subject,
                    saveAfterDeadline: editTodoStore.saveAfterDeadline,
                });
                setSelectedDateFrom(moment(editTodoStore.dateFrom, format));
                setSelectedDateTo(moment(editTodoStore.dateTo, format));
                setSelectedUsers([editTodoStore.otherMembers]);
                set_idInitial(editTodoStore._id);
                setPartInitial(editTodoStore.part);
            }
        }

    }, [editTodoStore, todoData, reset]);

    useEffect(() => {
        setDynamicStyles({
            height: isUserLogin ? `${vpHeight - 64}px` : `${vpHeight - 64 - 39}px`,
        });
    }, [isUserLogin, vpHeight]);

    useEffect(() => {
        const fetchTodoFromLocalStorage = () => {
            const localStorageData = localStorage.getItem('notes-organizer_tasks');
            if (localStorageData) {
                const tasksFromLocalStorage = JSON.parse(localStorageData);
                const todoFromLocalStorage = tasksFromLocalStorage.find((todo: ITodoCreate) => todo._id === id);
                return todoFromLocalStorage;
            }
            return {};
        };

        if (!todoData || !Object.keys(todoData).length) {
            if (isUserLogin && id) {
                dispatch(getEditTodo(id));
            }
            if (!isUserLogin && id) {
                const editTodoLocalStorage = fetchTodoFromLocalStorage();
                dispatch(saveEditTodo(editTodoLocalStorage));
            }
        } 
    }, [todoData, dispatch, id, isUserLogin]);

    useEffect(() => {
        if (selectedUsers.length > 0) {
            updatePreviewField('otherMembers', selectedUsers.join(', '));
        } if (selectedUsers.length === 0) {
            updatePreviewField('otherMembers', '');
        }
    }, [selectedUsers]);

    const updatePreviewField = (fieldName: string, value: any) => {
        if (fieldName === 'dateFrom') {
            const formattedValue = moment(value, 'DD.MM.YYYY');
            setSelectedDateFrom(formattedValue);
            setPreviewData((prevData) => ({
                ...prevData,
                [fieldName]: value,
            }));
        } if (fieldName === 'dateTo') {
            const formattedValue = moment(value, 'DD.MM.YYYY');
            setSelectedDateTo(formattedValue);
            setPreviewData((prevData) => ({
                ...prevData,
                [fieldName]: value,
            }));
        } if (fieldName === 'part') {
            setPreviewData((prevData) => ({
                ...prevData,
                [fieldName]: value.value,
            }));
        } else {
            setPreviewData((prevData) => ({
                ...prevData,
                [fieldName]: value,
            }));
        }
    };

    

    const onSubmit = async (data: ITodoCreate) => {
        const finalData: ITodoCreate = {
            part: data.part.value,
            subject: data.subject,
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            additionalInfo: data.additionalInfo,
            otherMembers: previewData.otherMembers,
            saveAfterDeadline: data.saveAfterDeadline,
            _id: _idInitial,
        }

        if (!isUserLogin) {
            const existingTasks = JSON.parse(localStorage.getItem('notes-organizer_tasks') || '[]');
            const taskIndex = existingTasks.findIndex((task: ITodoCreate) => task._id === _idInitial);

            if (taskIndex !== -1) {
                existingTasks[taskIndex] = { ...existingTasks[taskIndex], ...finalData };
                localStorage.setItem('notes-organizer_tasks', JSON.stringify(existingTasks));
                dispatch(createMessageConfirmation("Todo edited successfully"));
            } else {
                return;
            }
        } else {
            await dispatch(editTodo(finalData));
        }

        reset({
            ...initialState
        });
        setShowUsersList(false);
        setSelectedUsers([]);
        setSelectedDateFrom(moment());
        setSelectedDateTo(moment());
        setPreviewData(initialState);
        setPartInitial('');
        naviagteToList();
    };

    const handleAddUsersClick = () => {
        if (!showUsersList) {
            setShowUsersList(true);
        } else {
            setShowUsersList(false);
        }
    };

    const resetMessage = () => {
        const timeoutId = setTimeout(() => {
            dispatch(clearTodoMessage());
        }, 10000);
        return () => clearTimeout(timeoutId);
    };

    const naviagteToList = () => {
        const timeoutId = setTimeout(() => {
            navigate('/list');
        }, 10000);
        return () => clearTimeout(timeoutId);
    };

    const handlePreviewButtonClick = () => {
        setIsShowPreviewInMobile(!isShowPreviewInMobile);
    };

    return (
    <section className={s.editTodo} style={dynamicStyles}>
        <Container>
            <div className={s.todoPart}>
                <div className={s.edit}>
                    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                        <Text
                            text={'Розділ'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="part"
                            rules={{ required: true }}
                            render={({ field: {onChange, value}, fieldState }) => (
                            <SelectField
                                value={value}
                                handleChange={(newValue) => {
                                    onChange(newValue);
                                    updatePreviewField('part', newValue);
                                }}
                                name="part"
                                className="createTodo"
                                placeholder={partInitial}
                                required={true}
                                options={options}
                                defaultValue={{
                                    value: partInitial,
                                    label: partInitial,
                                }}
                            />
                            )}
                        />
                        <Text
                            text={'Тема'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="subject"
                            rules={{ required: true}}
                            render={({ field: { onChange, value }, fieldState }) => (
                            <TextField
                                value={value}
                                control={control}
                                className="createTodo"
                                handleChange={(e) => {
                                    const newValue = e.target.value;
                                    onChange(newValue);
                                    updatePreviewField('subject', newValue);
                                    }}
                                error={fieldState.error}
                                {...fields.subject}
                            />
                            )}
                        />
                        <Text
                            text={'Дата початку'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="dateFrom"
                            rules={{ required: true}}
                            render={({ field: {onChange}}) => (
                            <Calendar
                                dateFormat="dd.MM.yyyy" 
                                showMonthYearPicker={false} 
                                value={selectedDateFrom.toDate()} 
                                handleChange={(newValue) => {
                                    onChange(newValue);
                                    updatePreviewField('dateFrom', newValue);
                                }}
                            />
                            )}
                        />
                        <Text
                            text={'Дата завершення'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="dateTo"
                            rules={{ required: true}}
                            render={({ field: {onChange}}) => (
                            <Calendar
                                dateFormat="dd.MM.yyyy" 
                                showMonthYearPicker={false} 
                                value={selectedDateTo.toDate()} 
                                handleChange={(newValue) => {
                                    onChange(newValue);
                                    updatePreviewField('dateTo', newValue);
                                }}
                            />
                            )}
                        />
                        <Text
                            text={'Додаткова інформація'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="additionalInfo"
                            rules={{ required: false}}
                            render={({ field: {onChange, value}, fieldState }) => (
                            <textarea
                                className={`${s.textarea} ${s.scroll}`}
                                value={value}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    updatePreviewField('additionalInfo', e.target.value);
                                }}
                                rows={3}
                                cols={40}
                            />
                            )}
                        />
                            {isUserLogin && 
                                <>
                        <Text
                            text={'Користувачі з яким ви хочете поділитися завданням'}
                            textClass="title-form"
                        />
                        <div className={s.userListShow}>
                            <Text
                                text={selectedUsers.join(', ')}
                                textClass="hidenInputCreateTodo"
                            />
                        </div>
                        <div className={s.addUserGroup}> 
                            <div className={s.addUser} onClick={handleAddUsersClick}>   
                                <FaPlus size={20} color='white' /> 
                            </div>  
                            <Text
                                text={!showUsersList ? 'Додати користувачів' : 'Обрати користувачів'}
                                textClass="title-form-add-user"
                            /> 
                        </div>
                            {showUsersList && <div className={s.modal}>
                                <div className={s.modalBorder}>
                                    <button className={s.dismissButton} onClick={handleAddUsersClick }>
                                        <FontAwesomeIcon icon={faTimes} size="lg" color='white' />
                                    </button>
                                    <UserList
                                        arrayUser={arrayUser}
                                        selectedUsers={selectedUsers}
                                        setSelectedUsers={setSelectedUsers}
                                    />
                                </div>
                            </div>}
                            </>}  
                        <Text
                            text={'Зберігати завдання після закінчення терміну виконання'}
                            textClass="title-form"
                        />
                        <Controller
                            control={control}
                            name="saveAfterDeadline"
                            render={({ field: { onChange, value } }) => (
                            <div>
                                <input
                                    type="checkbox"
                                    className={s.checkbox}
                                    checked={value}
                                    onChange={(e) => {
                                        onChange(e.target.checked);
                                        updatePreviewField('saveAfterDeadline', e.target.checked)
                                    }}
                                />
                            </div>
                            )}
                        />
                        <div className={s.btnPart}>
                            <div className={s.wrap}>
                                <Button text="Зберегти зміни" btnClass="btnLight" />
                            </div>
                                {isMobile && (<div className={s.wrap}>
                                    <Button text="Перегляд" btnClass="btnLight" handleClick={handlePreviewButtonClick} type='button' />
                            </div>)}
                        </div>
                    </form>
                </div>
                {!isMobile && (<div className={s.preview}>
                    <Todo {...previewData} />
                </div>)}
                {isMobile && isShowPreviewInMobile && (<div className={s.previewInMobile}>
                    <Todo {...previewData} />
                    <div className={s.btnReturn}>
                        <Button text="Повернутися" btnClass="btnLight" handleClick={handlePreviewButtonClick} type='button' />
                    </div>
                </div>)}
            </div>
            {message && (
                <Message text={`${message}`} onDismiss={resetMessage} type="todo" />
            )}
        </Container>
    </section>
    );
}

export default EditTodo;