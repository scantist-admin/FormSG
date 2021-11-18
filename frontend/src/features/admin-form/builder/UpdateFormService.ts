import { FormFieldDto } from '~shared/types/field'

import { ApiService } from '~services/ApiService'

/**
 * Reorders the field to the given new position.
 * @param formId the id of the form to perform the field reorder
 * @param fieldId the id of the field to reorder
 * @param newPosition the position to move the field to
 * @returns the reordered form fields of the form corresponding to the formId
 */
export const reorderSingleFormField = async (
  formId: string,
  fieldId: string,
  newPosition: number,
): Promise<FormFieldDto[]> => {
  return ApiService.post<FormFieldDto[]>(
    `/admin/forms/${formId}/fields/${fieldId}/reorder`,
    {},
    { params: { to: newPosition } },
  ).then(({ data }) => data)
}
