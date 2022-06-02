const { Schema, model } = require("mongoose")

const gameSchema = new Schema(
    {
        title: {
          type: String,
          unique: true,
          required: true
        },
        cover: {
          type: String,
        },
        genre: {
          type: String,
          required: true
        },
        platform: {
          type: String,
          required: true
        },
        saga: {
          type: String,
        },
        company: {
          type: Schema.Types.ObjectId,
          ref: "company"  
        },
        state: {
          type: String,
          enum: ["isPlayed","isWished","isFinished"]
        },
    },
    {
        timestamps: true,
    }
);

const GameModel = model("game", gameSchema)

module.exports = GameModel
    