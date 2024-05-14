import { useState, useEffect } from "react";
import axios from "axios";
import ParticipantsList from "../../components/ParticipantsList/ParticipantsList";

const EventParticipants = ({ eventId }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await axios.get(`/api/events/${eventId}/participants`);
        setParticipants(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchParticipants();
  }, [eventId]);

  return (
    <>
      <h1>Event Participants</h1>
      <ParticipantsList participants={participants} />
    </>
  );
};

export default EventParticipants;
