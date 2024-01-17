import mongoose from 'mongoose';
const EventSchema = new mongoose.Schema(
  {
    userId: { required: true, type: String },
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: { type: String },
    price: {
      type: Number,
      required: true,
    },
    totalTicket: { type: Number, required: true, default: 0 },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    cover: {},
  },
  {
    timestamps: true,
  }
);

const Events = mongoose.models.Event || mongoose.model('Event', EventSchema);
export default Events;
