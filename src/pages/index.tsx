import { GetServerSideProps } from "next/types";
import Grid from "@mui/material/Grid";
import TotalLessonsCard from "src/views/dashboard/TotalLessonsCard";
import TopCategories from "src/views/dashboard/TopCategories";
import TopTutors from "src/views/dashboard/TopTutors";
import WeeklyBookings from "src/views/dashboard/WeeklyBookings";
import DepositWithdraw from "src/views/dashboard/DepositWithdraw";
import Table from "src/views/dashboard/Table";
// import TutorTable from "src/views/dashboard/TutorTable";
import GeoMap from "src/views/dashboard/Map"; // GeoMap import
import PendingTutors from "src/views/dashboard/PendingTutors" ;

import { db } from "../lib/firebase";
import { collection, query, getDocs } from "firebase/firestore";

// Types for the data used in the dashboard
interface Category {
  instrument: string;
  count: number;
}

interface Tutor {
  name: string;
  count: number;
}

interface DashboardProps {
  totalNumLessons: number;
  topCategories: Category[];
  topTutors: Tutor[];
  thisWeekBookings: number;
  lastWeekBookings: number;
  geoMapData: GeographicData[];
}

interface GeographicData {
  state: string;
  intensity: number; // 0 to 1
}

// Function to fetch and process lessons data for bookings in the last two weeks
const getWeeklyBookings = async () => {
  const nowISOString = new Date().toISOString();
  const lastWeekISOString = new Date(
    new Date().setDate(new Date().getDate() - 7)
  ).toISOString();
  const twoWeeksAgoISOString = new Date(
    new Date().setDate(new Date().getDate() - 14)
  ).toISOString();

  let thisWeekBookings = 0;
  let lastWeekBookings = 0;

  const q = query(collection(db, "lessons"));
  const querySnapshot = await getDocs(q);
  const lessonsArray = querySnapshot.docs.map((doc) => doc.data());

  for (const lesson of lessonsArray) {
    if (
      new Date(lesson.bookingTime).getTime() >=
        new Date(lastWeekISOString).getTime() &&
      new Date(lesson.bookingTime).getTime() < new Date(nowISOString).getTime()
    ) {
      thisWeekBookings++;
    } else if (
      new Date(lesson.bookingTime).getTime() >=
        new Date(twoWeeksAgoISOString).getTime() &&
      new Date(lesson.bookingTime).getTime() <
        new Date(lastWeekISOString).getTime()
    ) {
      lastWeekBookings++;
    }
  }
  return { thisWeekBookings, lastWeekBookings };
};

// Function to fetch total number of lessons
const getTotalNumLessons = async () => {
  let lessons = 0;

  const q = query(collection(db, "tutors"));
  const querySnapshot = await getDocs(q);

  const tutorsArray = querySnapshot.docs.map((doc) => doc.data());
  tutorsArray.forEach((tutor) => {
    lessons += tutor.lessons.length;
  });
  return lessons;
};

// Function to fetch the top categories from lessons data
const getTopCategories = async () => {
  let categoriesArray: Category[] = [];

  const q = query(collection(db, "lessons"));
  const querySnapshot = await getDocs(q);

  const lessonsArray = querySnapshot.docs.map((doc) => doc.data());

  for (const lesson of lessonsArray) {
    if (
      categoriesArray.some(
        (category) => category.instrument === lesson.instrument
      )
    ) {
      categoriesArray.find(
        (category) => category.instrument === lesson.instrument
      )!.count++;
    } else {
      categoriesArray.push({ instrument: lesson.instrument, count: 1 });
    }
  }

  return categoriesArray.sort((a, b) => b.count - a.count);
};

// Function to fetch the top tutors from the tutors data
const getTopTutors = async () => {
  const q = query(collection(db, "tutors"));
  const querySnapshot = await getDocs(q);
  const tutorsDataArray = querySnapshot.docs.map((doc) => doc.data());

  const tutorArray = tutorsDataArray.map((tutor) => {
    return {
      name: tutor.name as string,
      count: tutor.lessons.length as number,
    } as Tutor;
  });

  return tutorArray.sort((a, b) => b.count - a.count);
};

// Fetching the GeoMap data (number of lessons or other metric by state)
const getGeoMapData = async () => {
  const q = query(collection(db, "lessons"));
  const querySnapshot = await getDocs(q);
  const lessonsArray = querySnapshot.docs.map((doc) => doc.data());

  const stateCounts = lessonsArray.reduce((acc, lesson) => {
    const state = lesson.state; // Assuming lesson data has state field
    if (state) {
      acc[state] = (acc[state] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return Object.keys(stateCounts).map((state) => ({
    state,
    intensity: stateCounts[state] / Math.max(...Object.values(stateCounts)),
  }));
};

// Fetching server-side props
export const getServerSideProps: GetServerSideProps = async (context) => {
  const totalNumLessons = await getTotalNumLessons();
  const topCategories = await getTopCategories();
  const topTutors = await getTopTutors();
  const { thisWeekBookings, lastWeekBookings } = await getWeeklyBookings();
  const geoMapData = await getGeoMapData();

  return {
    props: {
      totalNumLessons,
      topCategories,
      topTutors,
      thisWeekBookings,
      lastWeekBookings,
      geoMapData, // Pass GeoMap data to the page
    },
  };
};

// Dashboard Component
const Dashboard = ({
  totalNumLessons,
  topCategories,
  topTutors,
  thisWeekBookings,
  lastWeekBookings,
  geoMapData,
}: DashboardProps) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <TotalLessonsCard totalNumLessons={totalNumLessons} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TopCategories topCategories={topCategories} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TopTutors topTutors={topTutors} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <WeeklyBookings thisWeekBookings={thisWeekBookings} lastWeekBookings={lastWeekBookings} />
      </Grid>
      <Grid item xs={12} md={12} lg={8}>
        <DepositWithdraw />
      </Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
      <Grid item xs={12}>
        <PendingTutors />
      </Grid>
      <Grid item xs={12}>
        <GeoMap geoMapData={geoMapData} /> {/* Pass geoMapData to GeoMap */}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
