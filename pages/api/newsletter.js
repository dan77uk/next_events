import { connectDatabase, insertDocument } from "../../helpers/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email Address" });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).send({ message: "Connecting to database failed" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).send({ message: "Inserting data failed" });
      return;
    }
    res.status(201).send({ message: "Signed up!" });
  }
}
