import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
  products: {
    type: [],
  },
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);
export { cartsModel };