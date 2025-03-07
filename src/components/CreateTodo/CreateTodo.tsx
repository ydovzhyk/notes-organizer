import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import moment, { Moment } from 'moment';
import { useAppDispatch } from '../../hooks/hooks';
import { searchLocalStoradge } from '../helpers/searchLocalStoradge';
import { ITodoSearch } from '../types/todo/todo';
import { createTodo, synchronizeTodo } from '../../Redux/todo/todo-operations';
import { getLogin } from '../../Redux/auth/auth-selectors';
import { getTodoMessage } from '../../Redux/todo/todo-selectors';
import { getStopResetMessage } from '../../Redux/todo/todo-selectors';
import { statusStopResetMessage } from '../../Redux/todo/todo-slice';
import {
  clearTodoMessage,
  createMessageConfirmation,
} from '../../Redux/todo/todo-slice';
import { getEmailList } from '../../Redux/technical/technical-selectors';
import { getOptionMenu } from '../../Redux/technical/technical-selectors';
import Container from '../Shared/Container';
import Calendar from '../Shared/Calendar';
import SelectField from '../Shared/SelectField';
import Button from '../Shared/Button';
import Text from '../Shared/Text';
import TextField from '../Shared/TextField';
import UserList from './UserList';
import Todo from '../Todo/Todo';
import Message from '../Shared/Message';
import { fields } from '../Shared/TextField/fields';
import { ITodoCreate } from '../types/todo/todo';
import { ITodoProps } from '../Todo/Todo';
import { FaPlus } from 'react-icons/fa';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './CreateTodo.module.scss';

const CreateTodo: React.FC = () => {
  const dispatch = useAppDispatch();
  const isUserLogin = useSelector(getLogin);
  const arrayUser = useSelector(getEmailList);
  const options = useSelector(getOptionMenu);
  const message = useSelector(getTodoMessage);
  const stopResetMessage = useSelector(getStopResetMessage);
  const [showUsersList, setShowUsersList] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState<Moment>(moment());
  const [selectedDateTo, setSelectedDateTo] = useState<Moment>(moment());
  const initialState = {
    additionalInfo: '',
    dateFrom: '',
    dateTo: '',
    otherMembers: '',
    part: '',
    subject: '',
    saveAfterDeadline: false,
  };
  const [previewData, setPreviewData] = useState<ITodoProps>(initialState);
  const [isShowPreviewInMobile, setIsShowPreviewInMobile] = useState(false);
  const [todoToSynchronize, setTodoToSynchronize] = useState<ITodoCreate[]>([]);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const fetchData = async () => {
      if (isUserLogin) {
        const finalData: ITodoSearch = { searchByStatus: '' };
        const localStoradgeTodo = searchLocalStoradge(finalData);
        if (localStoradgeTodo && localStoradgeTodo.length > 0) {
          setTodoToSynchronize(localStoradgeTodo);
          await dispatch(statusStopResetMessage(true));
          await dispatch(
            createMessageConfirmation(
              'You have tasks saved locally on your computer, would you like to synchronize them with the server?'
            )
          );
        }
      }
    };
    fetchData();
  }, [isUserLogin, dispatch]);

  useEffect(() => {
    if (selectedUsers.length > 0) {
      updatePreviewField('otherMembers', selectedUsers.join(', '));
    }
    if (selectedUsers.length === 0) {
      updatePreviewField('otherMembers', '');
    }
  }, [selectedUsers]);

  const updatePreviewField = (fieldName: string, value: any) => {
    if (fieldName === 'dateFrom') {
      const formattedValue = moment(value, 'DD.MM.YYYY');
      setSelectedDateFrom(formattedValue);
      setPreviewData(prevData => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
    if (fieldName === 'dateTo') {
      const formattedValue = moment(value, 'DD.MM.YYYY');
      setSelectedDateTo(formattedValue);
      setPreviewData(prevData => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
    if (fieldName === 'part') {
      setPreviewData(prevData => ({
        ...prevData,
        [fieldName]: value.value,
      }));
    } else {
      setPreviewData(prevData => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };

  const { control, handleSubmit, reset } = useForm<ITodoCreate>({
    defaultValues: {
      part: { value: '', label: '' },
      subject: '',
      dateFrom: '',
      dateTo: '',
      additionalInfo: '',
      saveAfterDeadline: false,
    },
  });

  function generateUniqueId() {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    const uniqueId =
      timestamp +
      'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      });

    return uniqueId;
  }

  const onSubmit = async (data: ITodoCreate) => {
    const finalData: ITodoCreate = {
      part: data.part.value,
      subject: data.subject,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      additionalInfo: data.additionalInfo,
      otherMembers: previewData.otherMembers,
      saveAfterDeadline: data.saveAfterDeadline,
    };

    if (!isUserLogin) {
      const existingTasks = JSON.parse(
        localStorage.getItem('notes-organizer_tasks') || '[]'
      );
      existingTasks.push({ ...finalData, _id: generateUniqueId() });
      localStorage.setItem(
        'notes-organizer_tasks',
        JSON.stringify(existingTasks)
      );
      dispatch(createMessageConfirmation('Todo added successfully'));
    } else {
      await dispatch(createTodo(finalData));
    }

    reset();
    setShowUsersList(false);
    setSelectedUsers([]);
    setSelectedDateFrom(moment());
    setSelectedDateTo(moment());
    setPreviewData(initialState);
  };

  const handleAddUsersClick = () => {
    if (!showUsersList) {
      setShowUsersList(true);
    } else {
      setShowUsersList(false);
    }
  };

  const resetMessage = () => {
    if (!stopResetMessage) {
      const timeoutId = setTimeout(() => {
        dispatch(clearTodoMessage());
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
  };

  const handlePreviewButtonClick = () => {
    setIsShowPreviewInMobile(!isShowPreviewInMobile);
  };

  const synchronize = async (choice: true | false) => {
    if (choice === true) {
      const syncResonse = await dispatch(synchronizeTodo(todoToSynchronize));
      if (syncResonse && syncResonse.meta.requestStatus === 'fulfilled') {
        localStorage.setItem('notes-organizer_tasks', JSON.stringify([]));
        setTodoToSynchronize([]);
      }
    } else {
      dispatch(clearTodoMessage());
      dispatch(statusStopResetMessage(false));
    }
  };

  return (
    <section className={s.createTodo}>
      <Container>
        <div className={s.todoPart}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Text text={'Розділ'} textClass="title-form" />
            <Controller
              control={control}
              name="part"
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState }) => (
                <SelectField
                  value={value}
                  handleChange={newValue => {
                    onChange(newValue);
                    updatePreviewField('part', newValue);
                  }}
                  name="part"
                  className="createTodo"
                  placeholder="Оберіть опцію"
                  required={true}
                  options={options}
                />
              )}
            />
            <Text text={'Тема'} textClass="title-form" />
            <Controller
              control={control}
              name="subject"
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState }) => (
                <TextField
                  value={value}
                  control={control}
                  className="createTodo"
                  handleChange={e => {
                    const newValue = e.target.value;
                    onChange(newValue);
                    updatePreviewField('subject', newValue);
                  }}
                  error={fieldState.error}
                  {...fields.subject}
                />
              )}
            />
            <Text text={'Дата початку'} textClass="title-form" />
            <Controller
              control={control}
              name="dateFrom"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Calendar
                  dateFormat="dd.MM.yyyy"
                  showMonthYearPicker={false}
                  value={selectedDateFrom.toDate()}
                  handleChange={newValue => {
                    onChange(newValue);
                    updatePreviewField('dateFrom', newValue);
                  }}
                />
              )}
            />
            <Text text={'Дата завершення'} textClass="title-form" />
            <Controller
              control={control}
              name="dateTo"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Calendar
                  dateFormat="dd.MM.yyyy"
                  showMonthYearPicker={false}
                  value={selectedDateTo.toDate()}
                  handleChange={newValue => {
                    onChange(newValue);
                    updatePreviewField('dateTo', newValue);
                  }}
                />
              )}
            />
            <Text text={'Додаткова інформація'} textClass="title-form" />
            <Controller
              control={control}
              name="additionalInfo"
              rules={{ required: false }}
              render={({ field: { onChange, value }, fieldState }) => (
                <textarea
                  className={`${s.textarea} ${s.scroll}`}
                  value={value}
                  onChange={e => {
                    onChange(e.target.value);
                    updatePreviewField('additionalInfo', e.target.value);
                  }}
                  rows={3}
                  cols={40}
                />
              )}
            />
            {isUserLogin && (
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
                    <FaPlus size={20} color="white" />
                  </div>
                  <Text
                    text={
                      !showUsersList
                        ? 'Додати користувачів'
                        : 'Обрати користувачів'
                    }
                    textClass="title-form-add-user"
                  />
                </div>
                {showUsersList && (
                  <div className={s.modal}>
                    <div className={s.modalBorder}>
                      <button
                        className={s.dismissButton}
                        onClick={handleAddUsersClick}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          size="lg"
                          color="white"
                        />
                      </button>
                      <UserList
                        arrayUser={arrayUser}
                        selectedUsers={selectedUsers}
                        setSelectedUsers={setSelectedUsers}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            <Text
              text={'Зберігати завдання після закінчення терміну виконання'}
              textClass="title-form"
            />
            <Controller
              control={control}
              name="saveAfterDeadline"
              render={({ field: { onChange, value } }) => (
                <div className={s.checkboxDiv}>
                  <input
                    type="checkbox"
                    className={s.checkbox}
                    checked={value}
                    onChange={e => {
                      onChange(e.target.checked);
                      updatePreviewField('saveAfterDeadline', e.target.checked);
                    }}
                  />
                </div>
              )}
            />
            <div className={s.btnPart}>
              <div className={s.wrap}>
                <Button text="Створити" btnClass="btnLight" />
              </div>
              {isMobile && (
                <div className={s.wrap}>
                  <Button
                    text="Перегляд"
                    btnClass="btnLight"
                    handleClick={handlePreviewButtonClick}
                    type="button"
                  />
                </div>
              )}
            </div>
          </form>
          {!isMobile && (
            <div className={s.preview}>
              <Todo {...previewData} />
            </div>
          )}
          {isMobile && isShowPreviewInMobile && (
            <div className={s.previewInMobile}>
              <Todo {...previewData} />
              <div className={s.btnReturn}>
                <Button
                  text="Повернутися"
                  btnClass="btnLight"
                  handleClick={handlePreviewButtonClick}
                  type="button"
                />
              </div>
            </div>
          )}
        </div>
        {message && (
          <Message
            text={`${message}`}
            onDismiss={resetMessage}
            onChoice={synchronize}
            type="todo"
          />
        )}
      </Container>
    </section>
  );
};

export default CreateTodo;
