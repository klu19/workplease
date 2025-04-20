import React, { useEffect, useState } from "react";
import { Table, Loader, Text, Center, Button, Image, Modal} from "@mantine/core";


interface Tutor {
  uid: string;
  name: string;
  email: string;
  idRef?: string; // Optional field for ID image reference
}

const FIREBASE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET; // bucket name


const PendingTutors = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch("/api/tutors/getNotApproved");
        const data = await response.json();
        setTutors(data);
      } catch (error) {
        console.error("Failed to fetch tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const handleApprove = async (uid: string) => {
    try {
      await fetch("/api/tutors/approve", {
        method: "POST",
        body: JSON.stringify({ uid }),
        headers: { "Content-Type": "application/json" },
      });
      setTutors(tutors.filter((tutor) => tutor.uid !== uid));
    } catch (error) {
      console.error("Failed to approve tutor:", error);
    }
  };

  if (loading) {
    return (
      <Center>
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <div>
      <Text align="center" size="xl" weight={600}>
        Prospective Tutors
      </Text>
      
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="auto"
        centered
        withCloseButton
      >
        {selectedImageUrl && (
          <Image
            src={selectedImageUrl}
            alt="Expanded ID"
            width="100%"
            radius="md"
          />
        )}
      </Modal>

      <Table highlightOnHover withColumnBorders striped>
  <thead>
    <tr>
      <th style={{ verticalAlign: "middle" }}>Name</th>
      <th style={{ verticalAlign: "middle" }}>Email</th>
      <th style={{ verticalAlign: "middle", width: 120, textAlign: "center" }}>ID Upload</th>
      <th style={{ verticalAlign: "middle", width: 100 }}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {tutors.map((tutor) => (
      <tr key={tutor.uid} style={{ height: 100 }}>
        <td style={{ verticalAlign: "middle" }}>{tutor.name}</td>
        <td style={{ verticalAlign: "middle" }}>{tutor.email}</td>
        <td style={{ verticalAlign: "middle", textAlign: "center" }}>
          {tutor.idRef ? (
            <div style={{ width: 80, height: 80, overflow: "hidden", margin: "0 auto" }}>
              <Image
                src={`https://firebasestorage.googleapis.com/v0/b/${FIREBASE_BUCKET}/o/${encodeURIComponent(tutor.idRef)}?alt=media`}
                alt="Uploaded ID"
                width={80}
                height={80}
                fit="cover"
                radius="sm"
                style={{ cursor: "pointer", objectFit: "cover" }}
                onClick={() => {
                  setSelectedImageUrl(`https://firebasestorage.googleapis.com/v0/b/${FIREBASE_BUCKET}/o/${encodeURIComponent(tutor.idRef)}?alt=media`);
                  setModalOpened(true);
                }}
              />
            </div>
          ) : (
            <Text color="gray" size="sm">No ID uploaded</Text>
          )}
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <Button size="sm" fullWidth onClick={() => handleApprove(tutor.uid)}>
            Approve
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


    </div>
  );
};

export default PendingTutors;
