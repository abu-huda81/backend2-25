import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orderModel = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    product: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('order', orderModel)
