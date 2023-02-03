export default function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    console.log(userEmail);

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email Address" });
      return;
    }
    res.status(201).json({ message: "Signed up!" });
  }
}
