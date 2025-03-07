import { ITextFieldProps } from './TextField';

export const fields = {
  username: {
    label: 'User name',
    name: 'username',
    type: 'text',
    placeholder: 'User name*',
    title: '*The Name field must be more than 2 and less than 31 characters',
    required: true,
  } as ITextFieldProps,
  email: {
    label: 'Email',
    name: 'email',
    type: 'text',
    placeholder: 'Email*',
    title: '*Enter a valid email',
    required: true,
  } as ITextFieldProps,
  password: {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Password*',
    title:
      '*The Password field must be more than 2 and less than 21 characters',
    required: true,
  } as ITextFieldProps,
  subject: {
    label: 'Subject',
    name: 'subject',
    type: 'text',
    placeholder: '',
    title: '*The Subject field must be more than 2 characters',
    required: true,
  } as ITextFieldProps,
  search: {
    label: 'Search',
    name: 'search',
    type: 'text',
    placeholder: 'Введіть email для пошуку',
    title: '*The Subject field must be more than 2 characters',
    required: false,
  } as ITextFieldProps,
  searchByPhrase: {
    label: 'searchByPhrase',
    name: 'searchByPhrase',
    type: 'text',
    placeholder: 'Введіть слово чи фразу для пошуку',
    title: '*The Subject field must be more than 2 characters',
    required: false,
  } as ITextFieldProps,
};
