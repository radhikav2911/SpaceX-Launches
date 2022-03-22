import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import Loader from "../Loader/Loader";

const GET_UPCOMING_LAUNCHES = gql`
  {
    launchesUpcoming {
      links {
        article_link
        video_link
        mission_patch
      }
      launch_date_local
      launch_site {
        site_name_long
      }
      mission_name
      rocket {
        rocket_name
      }
    }
  }
`;

function UpcomingLaunches() {
  const { data, loading, error } = useQuery(GET_UPCOMING_LAUNCHES);
  if (loading)
    return (
      <div className="container">
        <Loader />
      </div>
    );
  if (error) console.log(error);
  return (
    <div className="container">
      <div className="launches">
        <div className="row">
          {data
            ? data.launchesUpcoming.map((nextlaunch: any) => (
                <div key={nextlaunch.mission_name}className="profile-card">
                  <div className="profile-content">
                    <div className="profile-image">
                      <img
                        src={
                          nextlaunch.links.mission_patch
                            ? nextlaunch.links.mission_patch
                            : process.env.PUBLIC_URL + "/default.jpg"
                        }
                        alt="space x"
                      />
                    </div>
                    <div className="desc">
                      <h2>{nextlaunch.mission_name}</h2>
                      <p>
                        Launch site: {nextlaunch.launch_site.site_name_long}
                      </p>
                      <p>
                        Date of launch: 
                        {moment(nextlaunch.launch_date_local).format(
                          "YYYY-MM-DD"
                        )}
                      </p>
                      <p> Rocket Name: {nextlaunch.rocket.rocket_name}</p>
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

export default UpcomingLaunches;
