import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

export default async function handler(req, res) {
  const { eventId } = req.query;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).send({ message: "Connecting to database failed" });
    return;
  }

  if (req.method === "POST") {
    // add server validation
    const { email, name, text } = req.body.commentData;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === 0
    ) {
      res.status(422).send({ message: "Invalid Input" });
      client.close();
      return;
    }

    const newComment = {
      eventId: eventId,
      date: new Date().toISOString(),
      email,
      name,
      text,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment.id = result.insertedId;
      res.status(201).send({ message: "Comment added", comment: newComment });
    } catch (error) {
      res.status(500).send({ message: "Inserting comment failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const comments = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).send({ comments: comments });
    } catch (error) {
      res.status(500).send({ message: "Could not collect comments" });
    }
  }

  client.close();
}
