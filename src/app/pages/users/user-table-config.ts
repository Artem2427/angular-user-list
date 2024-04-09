import { TableColumn } from '@shared/components/table/type'

export const prepareColumns = (): TableColumn[] => {
  return [
    {
      label: 'Username',
      key: 'username',
    },
    {
      label: 'First Name',
      key: 'first_name',
    },
    {
      label: 'Last Name',
      key: 'last_name',
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Type',
      key: 'user_type',
    },
  ]
}
