import { NextApiRequest, NextApiResponse } from "next/types";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let lessons = 0;

  const q = query(collection(db, "tutors"));
  const querySnapshot = await getDocs(q);

  const tutorsArray = querySnapshot.docs.map((doc) => doc.data());
  tutorsArray.forEach((tutor) => {
    lessons += tutor.lessons.length;
  });

  res.status(200).send({ lessons });
}
