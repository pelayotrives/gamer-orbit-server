const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        videogame: {
            type: String,
        },        
        username: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        comment: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
)

const CommentModel = model("comment", commentSchema)

module.exports = CommentModel