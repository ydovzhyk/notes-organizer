import React from 'react';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import Text from '../Shared/Text';
import { FaClock, FaTimes } from 'react-icons/fa';
import s from './Todo.module.scss';

export interface ITodoProps {
  additionalInfo: string;
  dateFrom: string;
  dateTo: string;
  otherMembers: string;
  part: string;
  subject: string;
  saveAfterDeadline: boolean;
}

const checkDate = (date: string) => {
  const today = moment();
  const dueDate = moment(date, 'DD.MM.YYYY');

  if (dueDate.isSameOrAfter(today, 'day')) {
    return 'Виконується';
  } else {
    return 'Термін виконання минув';
  }
};

const Todo: React.FC<ITodoProps> = ({
  additionalInfo,
  dateFrom,
  dateTo,
  otherMembers,
  part,
  subject,
  saveAfterDeadline,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={s.todo}>
      <div>
        <Text text={'Перегляд завдання'} textClass="title-form-list" />
        <div className={s.todoCard}>
          {dateFrom && dateTo && (
            <div className={s.todoStatus}>
              <Text text={checkDate(dateTo)} textClass="title-form-todo" />
              {checkDate(dateTo) === 'Виконується' ? (
                <FaClock
                  color="green"
                  size="30px"
                  style={{ marginLeft: '20px', marginRight: '20px' }}
                />
              ) : (
                <FaTimes
                  color="red"
                  size="30px"
                  style={{ marginLeft: '20px', marginRight: '20px' }}
                />
              )}
            </div>
          )}
          {!isMobile && (
            <ul className={s.cardBorder}>
              <li className={s.cardGroup}>
                <div>
                  <Text text={'Розділ'} textClass="title-form-todo" />
                  <div className={s.partData}>
                    <Text text={part} textClass="hidenInputTodo" />
                  </div>
                </div>
                <div>
                  <Text text={'Дата початку'} textClass="title-form-todo" />
                  <div className={s.partDataDate}>
                    <Text text={dateFrom} textClass="hidenInput" />
                  </div>
                </div>
              </li>
              <li className={s.cardGroup}>
                <div>
                  <Text text={'Тема'} textClass="title-form-todo" />
                  <div className={s.partData}>
                    <Text text={subject} textClass="hidenInput" />
                  </div>
                </div>
                <div>
                  <Text text={'Дата закінчення'} textClass="title-form-todo" />
                  <div className={s.partDataDate}>
                    <Text text={dateTo} textClass="hidenInput" />
                  </div>
                </div>
              </li>
              <li className={s.cardGroup}>
                <div>
                  <Text
                    text={'Додаткова інформація'}
                    textClass="title-form-todo"
                  />
                  <div className={s.partDataAddInfoUser}>
                    <div className={s.scroll}>
                      <Text
                        text={additionalInfo}
                        textClass="hidenInputAddInfoUser"
                      />
                    </div>
                  </div>
                </div>
              </li>
              {otherMembers && (
                <li className={s.cardGroup}>
                  <div>
                    <Text
                      text={'Користувачі спільного завдання'}
                      textClass="title-form-todo"
                    />
                    <div className={s.partDataAddInfoUser}>
                      <Text
                        text={otherMembers}
                        textClass="hidenInputAddInfoUser"
                      />
                    </div>
                  </div>
                </li>
              )}
              <Text
                text={
                  saveAfterDeadline
                    ? '*Ваше завдання буде збережене після закінчення терміну його виконання'
                    : '*Ваше завдання буде видалено після закінчення терміну його виконання'
                }
                textClass="title-form-todo"
              />
            </ul>
          )}
          {isMobile && (
            <ul className={s.cardBorder}>
              <li className={s.cardGroupMobile}>
                <div>
                  <Text text={'Розділ'} textClass="title-form-todo" />
                  <div className={s.partData}>
                    <Text text={part} textClass="hidenInputTodo" />
                  </div>
                </div>
                <div>
                  <Text text={'Тема'} textClass="title-form-todo" />
                  <div className={s.partData}>
                    <Text text={subject} textClass="hidenInput" />
                  </div>
                </div>
              </li>
              <li className={s.cardGroupMobile}>
                <div>
                  <Text text={'Дата початку'} textClass="title-form-todo" />
                  <div className={s.partDataDate}>
                    <Text text={dateFrom} textClass="hidenInput" />
                  </div>
                </div>
                <div>
                  <Text text={'Дата закінчення'} textClass="title-form-todo" />
                  <div className={s.partDataDate}>
                    <Text text={dateTo} textClass="hidenInput" />
                  </div>
                </div>
              </li>
              <li className={s.cardGroupMobile}>
                <div>
                  <Text
                    text={'Додаткова інформація'}
                    textClass="title-form-todo"
                  />
                  <div className={s.partDataAddInfoUser}>
                    <div className={s.scroll}>
                      <Text
                        text={additionalInfo}
                        textClass="hidenInputAddInfoUser"
                      />
                    </div>
                  </div>
                </div>
              </li>
              {otherMembers && (
                <li className={s.cardGroupMobile}>
                  <div>
                    <Text
                      text={'Користувачі спільного завдання'}
                      textClass="title-form-todo"
                    />
                    <div className={s.partDataAddInfoUser}>
                      <Text
                        text={otherMembers}
                        textClass="hidenInputAddInfoUser"
                      />
                    </div>
                  </div>
                </li>
              )}
              <Text
                text={
                  saveAfterDeadline
                    ? '*Ваше завдання буде збережене після закінчення терміну його виконання'
                    : '*Ваше завдання буде видалено після закінчення терміну його виконання'
                }
                textClass="title-form-todo"
              />
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
