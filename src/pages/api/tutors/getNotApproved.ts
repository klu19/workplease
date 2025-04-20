import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../lib/firebase"; // adjust path if needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Query for tutors where "approved" is explicitly set to false
    const falseApprovedQuery = query(
      collection(db, "tutors"),
      where("approved", "==", false)
    );

    // Get documents for the query
    const falseApprovedDocs = await getDocs(falseApprovedQuery);

    // Map the results to an array of tutors
    const notApprovedTutors = falseApprovedDocs.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
    }));

    // Send the results
    res.status(200).json(notApprovedTutors);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch not-approved tutors" });
  }
}
