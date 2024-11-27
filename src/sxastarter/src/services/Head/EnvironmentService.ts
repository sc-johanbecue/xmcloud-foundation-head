export function IsEditingHost(): boolean {
  const editingHostVariable = process.env.NEXT_PUBLIC_IS_EDITING_HOST;
  const isEditing =
    editingHostVariable == undefined || editingHostVariable == '' || editingHostVariable == 'true';

  return isEditing;
}
