import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }


        await Promise.all([conversation.save(), newMessage.save()])
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
        res.status(201).json(newMessage)

    } catch (err) {
        console.log("Error in send message controller:", err.message)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}


export const getMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        if (conversation.messages) {
            res.status(200).json(conversation.messages);
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        console.log("Error in get message controller:", error.message);
        res.status(500).json({
            error: "Internal server error"
        });
    }

}