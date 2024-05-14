import { useParams } from "react-router-dom";
import ParticipantsList from "../../components/ParticipantsList/ParticipantsList";
import { useParticipantByEventQuery } from "../../redux/api/participantApi";
import Loader from "../../components/Loader/Loader";

const EventParticipants = () => {
  const { id } = useParams();
  const { data, isLoading } = useParticipantByEventQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ParticipantsList
        participants={data.participants}
        eventName={data.event.title}
      />
    </>
  );
};

export default EventParticipants;
