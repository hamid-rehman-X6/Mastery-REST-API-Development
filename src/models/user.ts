/**
 * @copyright 2025 HamidRehman
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    linedIn?: string;
    x?: string;
    youtbe?: string;
  };
}

/**
 * User Schema
 */
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      maxlength: [20, 'Username cannot exceed 20 characters'],
      unique: [true, 'Username must be unique'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxlength: [255, 'Email cannot exceed 255 characters'],
      unique: [true, 'Email must be unique'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    firstName: {
      type: String,
      maxlength: [20, 'First name cannot exceed 20 characters'],
    },
    lastName: {
      type: String,
      maxlength: [20, 'Last name cannot exceed 20 characters'],
    },
    socialLinks: {
      website: {
        type: String,
        maxlength: [255, 'Website URL cannot exceed 255 characters'],
      },
      facebook: {
        type: String,
        maxlength: [255, 'Facebook profile URL cannot exceed 255 characters'],
      },
      instagram: {
        type: String,
        maxlength: [255, 'Instagram profile URL cannot exceed 255 characters'],
      },
      linkedIn: {
        type: String,
        maxlength: [255, 'LinkedIn profile URL cannot exceed 255 characters'],
      },
      x: {
        type: String,
        maxlength: [255, 'X profile URL cannot exceed 255 characters'],
      },
      youtbe: {
        type: String,
        maxlength: [255, 'YouTube channel URL cannot exceed 255 characters'],
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default model<IUser>('User', userSchema);
