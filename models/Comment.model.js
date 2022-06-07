const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        videogame: {
            type: Schema.Types.ObjectId,
            ref: "game",
        },        
        username: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        comment: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const CommentModel = model("comment", commentSchema)

module.exports = CommentModel