import { useEffect, useState } from "react";
import { useUtilities } from "../../../Utility/hooks";
import styles from "./Jobs.module.scss";
import { ConfigureUtility } from "../../../Utility/ConfigureUtility";
import { useAviableJobTypes } from "./hooks";
const AviableJobTypes = ({ aviablejobtypes, setType, setSource }) =>
  aviablejobtypes.map((type) => {
    return (
      <button
        key={type}
        onClick={() => {
          setType(type);
          setSource(null);
        }}
      >
        {type}
      </button>
    );
  });
const SourceSelection = ({
  sourceDropdownShown,
  setSourceDropdownShown,
  source,
  setSource,
  data,
  type,
}) =>
  !sourceDropdownShown ? (
    <button onClick={() => setSourceDropdownShown(!sourceDropdownShown)}>
      {source !== null ? source.name : "Utilities"}
    </button>
  ) : (
    <div className={styles.list}>
      {data.utilities &&
        data.utilities.map((util) =>
          util.jobType === type ? (
            <button
              onClick={() => {
                setSource(util);
                setSourceDropdownShown(false);
              }}
            >
              {util.name}
            </button>
          ) : null
        )}
    </div>
  );

const DestinationSelection = ({
  destDropdownShown,
  setDestDropdownShown,
  destination,
  setDestination,
  data,
}) =>
  !destDropdownShown ? (
    <>
      <button onClick={() => setDestDropdownShown(!destDropdownShown)}>
        {destination !== null && destination.name}
      </button>
    </>
  ) : (
    <div className={styles.Dropdown}>
      <div>
        <div className={styles.list}>
          {data.utilities &&
            data.utilities.map(
              (util) =>
                util.jobType === "stove" && (
                  <button
                    onClick={() => {
                      setDestination(util);
                      setDestDropdownShown(false);
                    }}
                  >
                    {util.name}
                  </button>
                )
            )}
        </div>
      </div>
    </div>
  );

export const AddJob = ({ addJob }) => {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [startTime, setStartTime] = useState(null);
  // const [aviablejobtypes, setAviablejobtypes] = useState([]);
  const { data, error, isLoading } = useUtilities();
  const [sourceDropdownShown, setSourceDropdownShown] = useState(true);
  const [destDropdownShown, setDestDropdownShown] = useState(true);
  const aviablejobtypes = useAviableJobTypes();
  const [type, setType] = useState();

  return error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <>Loading...</>
  ) : data ? (
    <div>
      <table>
        <thead>
          <tr>
            <th>Job type</th>
            <th>Utility</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <AviableJobTypes
                aviablejobtypes={aviablejobtypes}
                setType={setType}
                setSource={setSource}
              />
            </th>
            <th>
              <SourceSelection
                sourceDropdownShown={sourceDropdownShown}
                setSourceDropdownShown={setSourceDropdownShown}
                source={source}
                setSource={setSource}
                data={data}
                type={type}
              />
            </th>
            <th>
              <DestinationSelection
                setDestDropdownShown={setDestDropdownShown}
                destDropdownShown={destDropdownShown}
                destination={destination}
                setDestination={setDestination}
                data={data}
              />
            </th>
          </tr>
        </tbody>
      </table>
      {source && (
        <ConfigureUtility
          utility={source}
          utilUpdate={(newdata) => setSource(newdata)}
        />
      )}
      <button
        onClick={() => addJob({ type, source, destination, status: "Created" })}
      >
        Add job to task
      </button>
    </div>
  ) : null;
};
