import type { NextApiRequest, NextApiResponse } from "next";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase"; // adjust this path if needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: "Missing tutor UID" });
  }

  try {
    const docRef = doc(db, "tutors", uid);
    await updateDoc(docRef, {
      approved: true,
    });
    res.status(200).json({ message: `Tutor ${uid} approved.` });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to approve tutor" });
  }
}
