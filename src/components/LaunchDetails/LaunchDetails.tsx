import { gql, useQuery } from "@apollo/client";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";


const GET_LAUNCHES = gql`
  query GET_LAUNCHES($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
        mission_patch
      }
      rocket {
        rocket {
          mass {
            kg
          }
        }
        rocket_name
        first_stage {
          cores {
            flight
            core {
              reuse_count
              status
            }
          }
        }
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
          }
        }
      }
    }
  }
`;

function LaunchDetails() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_LAUNCHES, {
    variables: { id },
  });
  if (loading)
    return (
      <div className="container">
        <Loader />
      </div>
    );
    if (error) console.log(error);

  return (
    <div>
      {data ? (
        <div className="container">
          <div className="launches">
            <div className="row">
              <div className="profile-card">
                <div className="profile-content">
                  <div className="profile-image">
                    <img
                      src={
                        data.launch.links.mission_patch
                          ? data.launch.links.mission_patch
                          : process.env.PUBLIC_URL + "/default.jpg"
                      }
                      alt="space x"
                    />
                  </div>
                  <div className="desc">
                    <h2>{data.launch.mission_name}</h2>
                    <h3>Launch details: </h3>
                    <p>Launch site: {data.launch.launch_site.site_name_long}</p>
                    <p>Date of Launch:{" "}
                      <Moment format="YYYY-MM-DD HH:mm">
                        {data.launch.launch_date_local}
                      </Moment>
                    </p>
                    <h3>Rocket details: </h3>
                    <p>Rocket name: {data.launch.rocket.rocket_name}</p>
                    <p>Mass in kg: {data.launch.rocket.rocket.mass.kg}</p>
                    <p>Payload type: {data.launch.rocket.second_stage.payloads[0].payload_type}</p>
                    <p>Weight of payload(kg): {data.launch.rocket.second_stage.payloads[0].payload_mass_kg}</p>
                    <h3>More info: </h3>
                    <div className="article_link">
                      {data.launch.links.article_link ? (
                        <a href={data.launch.links.article_link}>
                          <button className="link_button">
                            Link to article
                          </button>
                        </a>
                      ) : null}
                    </div>
                    <div className="video_link">
                      <a href={data.launch.links.video_link}>
                        <button className="link_button">Link to video</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default LaunchDetails;
