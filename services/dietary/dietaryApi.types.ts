export type UpdateDietary = {
  remove?: IDietary[];
  addNew?: IDietary[];
};

export interface IDietary {
  id: number;
  name: string;
  icon: string;
  alias?: string;
  menuItemDietCount: number;
}
