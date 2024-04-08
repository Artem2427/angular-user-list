import { FormControl, FormGroup } from '@angular/forms'

type RequiredInputType = {
  name: string
}

type OptionalInputType = {
  value: string | number
  label: string
  isRequired: boolean
  id: string
  formGroup: FormGroup
  formControl: FormControl
  placeholder: string
  emailIcon: boolean // TODO rewrite
}

export type InputType = RequiredInputType & Partial<OptionalInputType>
