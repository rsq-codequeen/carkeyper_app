export interface User {
  id?: number;
  name: string;
  email: string;
  contact?: string;
  role?: string;
  assignedVehicles?: string;
  joinedDate?: Date;
}
