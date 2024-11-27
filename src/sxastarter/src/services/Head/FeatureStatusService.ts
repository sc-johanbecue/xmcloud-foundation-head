export function IsSearchActivated(): boolean {
  const envVariable = process?.env?.NEXT_PUBLIC_SEARCH_ACTIVATED;
  const envVariable2 = process?.env?.NEXT_PUBLIC_SEARCH_APIKEY;
  return (
    envVariable2 != undefined &&
    envVariable2 != '' &&
    envVariable != undefined &&
    envVariable == 'true'
  );
}

export function IsOcActivated(): boolean {
  const envVariable = process?.env?.NEXT_PUBLIC_OC_ACTIVATED;
  return envVariable == undefined || envVariable == 'true';
}

export function IsAuthActicated(): boolean {
  const envVariable = process?.env?.NEXT_PUBLIC_AUTH_ACTIVATED;
  return envVariable == undefined || envVariable == 'true';
}
