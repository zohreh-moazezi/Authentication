import { getDbConnection } from "../db";
import bcrypt from "bcrypt";

const jwt = require("jsonwebtoken");

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    console.log("Received token in signup route:", req.headers.authorization);

    const db = getDbConnection("userdb");
    const user = await db.collection("users").findOne({ email });

    if (user) {
      res.sendStatus(409);
    }
    if (!password) {
      res.status(400).json({ error: "password is reqiured" });
      return;
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const startingInfo = {
      hairColor: " ",
      favoriteFood: " ",
      bio: " ",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      info: startingInfo,
      isVarified: false,
    });

    const { insertedId } = result;

    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVarified: false,
      },

      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        console.log("Generated Token:", token);
        res.status(200).json({ token });
      }
    );
    console.log("thhis is jwt.sign", jwt.sign);
  },
};
