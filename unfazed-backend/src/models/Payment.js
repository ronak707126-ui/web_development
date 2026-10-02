import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  status: {
    type: String,
    enum: ['created', 'pending', 'completed', 'failed', 'refunded', 'partially_refunded'],
    default: 'created',
  },
  purpose: {
    type: String,
    enum: ['session', 'package', 'subscription', 'addon'],
    required: true,
  },
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
    refundId: String,
  },
  invoice: {
    number: String,
    url: String,
    generatedAt: Date,
  },
  description: String,
  metadata: mongoose.Schema.Types.Mixed,
  failureReason: String,
  refundDetails: {
    amount: Number,
    reason: String,
    processedAt: Date,
    razorpayRefundId: String,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

paymentSchema.index({ therapist: 1, createdAt: -1 });
paymentSchema.index({ client: 1, createdAt: -1 });
paymentSchema.index({ 'razorpay.orderId': 1 }, { unique: true, sparse: true });
paymentSchema.index({ 'razorpay.paymentId': 1 }, { unique: true, sparse: true });
paymentSchema.index({ status: 1 });

export default mongoose.model('Payment', paymentSchema);