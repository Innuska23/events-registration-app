import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ParticipantsList from "../../components/ParticipantsList/ParticipantsList";
import {
  useLazyParticipantByEventQuery,
  useParticipantByEventStatisticQuery,
} from "../../redux/api/participantApi";
import Loader from "../../components/Loader/Loader";
import RegistrationStat from "../../components/RegistrationsChart/RegistrationsStatic";
import useDebounce from "../../hooks/useDebounce";

import styles from "./EventParticipants.module.css";

const EventParticipants = () => {
  const [searchName, setSearchName] = useState();
  const debouncedInputValue = useDebounce(searchName, 300);
  const { id } = useParams();
  const [fetch, { data, isLoading, isFetching }] =
    useLazyParticipantByEventQuery();
  const { data: statisticData, isLoading: isStatisticLoading } =
    useParticipantByEventStatisticQuery({ eventId: id });

  useEffect(() => {
    fetch({ eventId: id, search: debouncedInputValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue]);

  if (isLoading) {
    return <Loader />;
  }

  const handleInputChange = (event) => {
    setSearchName(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>{data?.event.title} Participants</h2>

      {!isStatisticLoading && !!statisticData?.length && (
        <RegistrationStat chartData={statisticData} />
      )}

      <input
        className={styles.search}
        type="text"
        value={searchName}
        onChange={handleInputChange}
        placeholder="Search..."
      />

      {isFetching && <Loader />}

      {!!data?.participants?.length && !isFetching && (
        <ParticipantsList
          participants={data.participants}
          eventName={data.event.title}
        />
      )}

      {!isLoading && !isFetching && !data?.participants?.length && (
        <span>Not found participants</span>
      )}
    </div>
  );
};

export default EventParticipants;
