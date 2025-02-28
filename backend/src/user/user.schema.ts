import { Schema, Document } from 'mongoose';

export interface User extends Document {
  googleId: string;
  email: string;
  name: string;
  picture: string;
  role: 'user' | 'admin';
  isEnabled: boolean;  // ✅ Add this field for enable/disable functionality
}

export const UserSchema = new Schema<User>({
  googleId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  picture: { type: String, required: false },
  role: { type: String, required: true, default: 'user' },
  isEnabled: { type: Boolean, required: true, default: true }  // ✅ Default to true
});
