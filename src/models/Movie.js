import mongoose, { Schema } from "mongoose";

const MovieSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Por favor ingresa el título'],
  },
  plot: {
    type: String,
    required: [true, 'Por favor ingresa el plot'],
  },
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema)