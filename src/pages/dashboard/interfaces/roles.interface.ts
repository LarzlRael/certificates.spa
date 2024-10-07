export interface UserRolesInterface {
  id:       number;
  name:     string;
  isactive: boolean;
}

export const mapAsCheckboxArray = (data: UserRolesInterface[]) => {
  return data.map((item) => {
    return {
      label: item.name,
      id: item.id,
      checked: item.isactive,
    };
  });
}