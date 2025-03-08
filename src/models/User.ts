import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IRole } from '../models/Role';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: IRole['_id'][]; // Referencia a los roles
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }], // Relación con la tabla de roles
});

// Hash de la contraseña antes de guardar
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', UserSchema);