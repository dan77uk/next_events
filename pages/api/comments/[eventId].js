export default function handler(req, res) {
  const { eventId } = req.query;

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
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    res.status(201).send({ message: "Comment added", comment: newComment });
  }
  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "Dan",
        email: "dan@email.com",
        comment:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        id: "c2",
        name: "Emma",
        email: "emma@email.com",
        comment:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        id: "c3",
        name: "Alan",
        email: "alan@email.com",
        comment:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ];

    res.status(200).send({ comments: dummyList });
  }
}
