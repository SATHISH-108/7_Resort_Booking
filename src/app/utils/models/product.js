const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  amenitie: {
    type: [String],
    default: ["Ac", "Greyser", "Tv", "Wi-Fi", "Elevator", "Break-fast"],
    set: function (amen) {
      const defaultValues = [
        "Ac",
        "Greyser",
        "Tv",
        "Wi-Fi",
        "Elevator",
        "Break-fast",
      ];
      if (typeof amen === "string") {
        amen = amen.split(",").map((item) => item.trim());
      }
      return Array.from(new Set([...defaultValues, ...amen]));
    },
  },
});

const ProductModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default ProductModel;
