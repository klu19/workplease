// pages/api/students/localecount.ts
import { NextApiRequest, NextApiResponse } from "next/types";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Example: Query the `students` collection in Firestore (replace with your actual collection name)
    const q = query(collection(db, "students"));
    const querySnapshot = await getDocs(q);
    
    console.log(`✅ Fetched ${querySnapshot.size} students from Firestore`);

    // Assuming each student has a state property, we will count students per state
    const stateCounts: Record<string, number> = {};

    querySnapshot.forEach((doc) => {
      const student = doc.data();
      const state = student.locale;  // Make sure your student data has the state field

      if (state) {
        stateCounts[state] = (stateCounts[state] || 0) + 1;
      }
    });

    // Return the counts of students per state (intensity = number of students per state)
    res.status(200).json(stateCounts);
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ error: "Failed to fetch student data" });
  }
}
