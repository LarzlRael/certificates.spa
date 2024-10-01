export interface UserAuth {
  id: number;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  location: string | null;
  createdAt: string; // Puedes usar Date si prefieres manejarlo como objeto Date
  phone: string | null;
  profileImageUrl: string | null;
  profileImageId: string | null;
  shippingAddress: string | null;
  address: string | null;
  addressCoordinates: { latitude: number; longitude: number } | null;
  roles: string[];
  accessToken: string;
}
export interface RolesInterface {
  id:          number;
  name:        string;
  description: string;
}
