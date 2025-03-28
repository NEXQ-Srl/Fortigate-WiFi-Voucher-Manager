// Type representing a voucher
export type Voucher = {
  id: number; // Unique identifier for the voucher
  q_origin_key: number; // Origin key for the voucher
  "user-id": string; // User ID associated with the voucher
  name: string; // Name of the voucher owner
  password: string; // Password for the voucher
  "mobile-phone": string; // Mobile phone number of the voucher owner
  sponsor: string; // Sponsor of the voucher
  company: string; // Company associated with the voucher
  email: string; // Email address of the voucher owner
  expiration: string; // Expiration date of the voucher
  comment: string; // Additional comments or notes
};