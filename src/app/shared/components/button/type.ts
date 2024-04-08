export type ButtonProps = {
  color?: ColorType
}

export const colors = {
  primary: 'primary',
  secondary: 'secondary'
} as const

export type ColorType = ValueOf<typeof colors>
