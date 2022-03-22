import { gql, useQuery } from "@apollo/client";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const GET_LAUNCHES = gql`
{
  launchesPast(limit: 30, sort: "kg") {
    id
    mission_name
    launch_date_local
    links {
      mission_patch
    }
    rocket {
      rocket {
        mass {
          kg
        }
      }
      rocket_name
    }
  }
}
`;

function Dashboard() {
  const { data, loading, error } = useQuery(GET_LAUNCHES);

  if (loading)
    return (
      <div className="container">
        <Loader />
      </div>
    );
  if (error) console.log(error);

  return (
    <div className="container">
      <h1 className="container-title">Launches Overview</h1>
      <div className="launches">
        <div className="row">
          {data
            ? data.launchesPast.map((launch: any) => (
              <div key={launch.id} className="profile-card">
                <div className="profile-content">
                  <div className="profile-image">
                    <img
                      src={
                        launch.links.mission_patch
                          ? launch.links.mission_patch
                          : process.env.PUBLIC_URL + "/default.jpg"
                      }
                      alt="space x"
                    />
                  </div>
                  <div className="desc">
                    <h2>{launch.mission_name}</h2>
                    <p>Rocket: {launch.rocket.rocket_name}</p>
                    <p>
                      Date of Launch:{" "}
                      <Moment format="YYYY-MM-DD HH:mm">
                        {launch.launch_date_local}
                      </Moment>
                    </p>
                  </div>
                  <div className="btn-div">
                    <Link
                      className="link_button"
                      to={`/launchdetails/${launch.id}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
