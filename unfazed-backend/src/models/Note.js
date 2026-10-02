import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
  type: {
    type: String,
    enum: ['private', 'shared', 'soap', 'dap', 'bip', 'intake', 'progress', 'termination', 'custom'],
    default: 'private',
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  template: {
    type: String,
    enum: ['soap', 'dap', 'bip', 'intake', 'progress', 'termination', 'custom'],
  },
  templateData: {
    subjective: String,
    objective: String,
    assessment: String,
    plan: String,
    data: String,
    assessment_dap: String,
    plan_dap: String,
    behavior: String,
    intervention: String,
    progress_bip: String,
  },
  isSigned: { type: Boolean, default: false },
  signedAt: Date,
  signedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  version: { type: Number, default: 1 },
  previousVersions: [{
    content: String,
    templateData: mongoose.Schema.Types.Mixed,
    updatedAt: Date,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
  tags: [{
    type: String,
    trim: true,
  }],
  isArchived: { type: Boolean, default: false },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

noteSchema.index({ therapist: 1, client: 1, createdAt: -1 });
noteSchema.index({ therapist: 1, session: 1 });
noteSchema.index({ therapist: 1, type: 1 });
noteSchema.index({ client: 1, type: 'shared' });

export default mongoose.model('Note', noteSchema);