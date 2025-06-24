import { model, Schema } from 'mongoose';

const roleSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  privilegeLevel: {
    type: Number,
    required: true,
  },
  canRead: {
    type: Boolean,
    required: true,
  },
  canWriteSelf: {
    type: Boolean,
    required: true,
  },
  canWriteOthers: {
    type: Boolean,
    required: true,
  },
  canDelete: {
    type: Boolean,
    required: true,
  },
});

export default model('roles', roleSchema);
