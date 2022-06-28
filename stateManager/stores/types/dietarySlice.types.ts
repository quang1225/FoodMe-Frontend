import { IDietary } from '@services/dietary/dietaryApi.types';

export interface IDietaryManager {
  list: Array<IDietary> | [];
  myDietary: Array<IDietary> | [];
  totalRecords: number;
  listFetching: boolean;
}
