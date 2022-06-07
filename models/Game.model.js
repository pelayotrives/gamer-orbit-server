const { Schema, model } = require("mongoose")

const gameSchema = new Schema(
    {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        gameApiId: {
          type: String,
        },
        title: {
          type: String,
          unique: true,
          required: true,
        },
        state: {
          type: String,
          enum: ["isPlaying","isOwned","isWished","isFinished"]
        },
    },
    {
        timestamps: true,
    }
);

const GameModel = model("game", gameSchema)

module.exports = GameModel
    