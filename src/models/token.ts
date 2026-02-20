/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import { model, Schema, Types } from 'mongoose';

interface IToken {
  token: string;
  userId: Types.ObjectId;
}

/**
 * Token Schema
 */
const tokenSchema = new Schema<IToken>({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default model<IToken>('Token', tokenSchema);
