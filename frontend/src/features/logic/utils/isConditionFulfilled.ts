import { DeepPartial } from 'react-hook-form'

import { BasicField } from '~shared/types/field'
import {
  FormCondition,
  LogicableField,
  LogicConditionState,
} from '~shared/types/form'

import { FormFieldValue } from '~templates/Field'
import { RADIO_OTHERS_INPUT_VALUE } from '~templates/Field/Radio/RadioField'

import { isLogicableField, isRadioFormFieldValue } from './typeguards'

const getCurrentFieldValue = (
  input: DeepPartial<FormFieldValue<LogicableField>>,
  fieldType: LogicableField,
) => {
  switch (fieldType) {
    case BasicField.Radio:
    case BasicField.Number:
    case BasicField.Decimal:
    case BasicField.Dropdown:
    case BasicField.Rating:
    case BasicField.YesNo:
      return input
  }
}

export const isConditionFulfilled = (
  input: DeepPartial<FormFieldValue>,
  condition: FormCondition,
  fieldType: BasicField,
): boolean => {
  // Not logic field, early return.
  const args = { fieldType, input }
  if (!isLogicableField(args)) return false

  const currentValue = getCurrentFieldValue(args.input, args.fieldType)
  if (currentValue === '') {
    return false
  }

  switch (condition.state) {
    case LogicConditionState.Lte:
      return Number(currentValue) <= Number(condition.value)
    case LogicConditionState.Gte:
      return Number(currentValue) >= Number(condition.value)
    case LogicConditionState.Either: {
      // currentValue must be in a value in condition.value
      const condValuesArray = Array.isArray(condition.value)
        ? condition.value.map(String)
        : [String(condition.value)]
      if (isRadioFormFieldValue(currentValue, args.fieldType)) {
        if (condValuesArray.includes('Others')) {
          // If the condition value is 'Others',
          // then the condition must be satisfied if the current value is the special input value AND
          // if the othersInput subfield has a value.
          const satisfiesOthers =
            currentValue.value === RADIO_OTHERS_INPUT_VALUE &&
            !!currentValue.othersInput
          if (satisfiesOthers) return true
        }
        return condValuesArray.includes(String(currentValue.value))
      }
      return condValuesArray.includes(String(currentValue))
    }
    case LogicConditionState.Equal: {
      if (isRadioFormFieldValue(currentValue, args.fieldType)) {
        // It's possible that the condition.value is in a single-valued array.
        const condValue = Array.isArray(condition.value)
          ? condition.value[0]
          : condition.value
        if (
          condValue === 'Others' &&
          currentValue.value === RADIO_OTHERS_INPUT_VALUE
        ) {
          // If the condition value is 'Others', then the condition must be
          // satisfied if the current value is the special input value.
          // Otherwise, we still fall through in case the 'Others' was a custom
          // value created by the user.
          return true
        }
        return String(condValue) === String(currentValue.value)
      }
      // In angular, number equality is string=== but decimal equality is number===.
      // Need to replicate this behavior for backward-compatibility.
      if (fieldType === BasicField.Decimal) {
        return Number(currentValue) === Number(condition.value)
      }
      return String(condition.value) === String(currentValue)
    }
  }
}
