import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LinkButton } from "@/components/LinkButton";
import capitalizeFirstLetter from "../components/util/capitalizeFirstLetter";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [matchHistory, setMatchHistory] = useState([]);
  const [accountNotFound, setAccountNotFound] = useState(false);
  const {
    peak_rank,
    profile_image,
    name,
    tag,
    level,
    rank,
    total_act_matches,
    total_act_wins,
  } = user;

  const searchParams = useSearchParams();
  const profileName = searchParams.get("name");
  const profileTag = searchParams.get("tag");

  useEffect(() => {
    const fetchMatchHistory = async () => {
      const result = await fetch(
        `/api/matches?name=${profileName}&tag=${profileTag}`
      );
      const jsonResult = await result.json();
      console.log(jsonResult);
      setMatchHistory(jsonResult);
      setIsLoading(false);
    };
    const fetchProfile = async () => {
      const result = await fetch(
        `/api/search?name=${profileName}&tag=${profileTag}`
      );
      console.log(result);
      if (!result.ok) {
        setAccountNotFound(true);
        return;
      }
      const jsonResult = await result.json();
      console.log(jsonResult);
      setUser(jsonResult);
      fetchMatchHistory();
    };

    if (profileName && profileTag) {
      fetchProfile();
    }
  }, [profileName, profileTag]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="px-6 bg-white shadow-md dark:bg-gray-800">
        <NavBar />
      </header>
      <main className="flex flex-col items-center justify-center flex-grow p-4">
        {accountNotFound === true ? (
          <div className="flex flex-col text-xl">
            Account Not Found{" "}
            <LinkButton className="mt-2" href="/">
              Return Home
            </LinkButton>
          </div>
        ) : (
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div>
              {peak_rank ? (
                <h2
                  data-test-id="peak-rank"
                  className="text-xl font-bold text-gray-800 dark:text-white"
                >
                  Peak Rank: {peak_rank}
                </h2>
              ) : (
                <Skeleton
                  className="h-[28px]"
                  baseColor="#1a1f2c"
                  width={"225px"}
                  highlightColor="#171923"
                />
              )}
              <div className="flex items-center space-x-4 mt-4">
                {profile_image ? (
                  <img
                    data-test-id="profile-image"
                    alt="Avatar"
                    className="rounded-full"
                    height="80"
                    src={profile_image}
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover",
                    }}
                    width="80"
                  />
                ) : (
                  <Skeleton
                    className="h-[80px]"
                    baseColor="#1a1f2c"
                    highlightColor="#171923"
                    width={"80px"}
                    circle
                  ></Skeleton>
                )}
                <div>
                  {name && tag ? (
                    <>
                      <h3
                        data-test-id="profile-name"
                        className="text-lg font-bold text-gray-800 dark:text-white"
                      >
                        {capitalizeFirstLetter(name)} #{tag}
                      </h3>
                      <span
                        data-test-id="profile-level"
                        className="text-gray-500 dark:text-gray-400"
                      >
                        Level: {level}{" "}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {rank ? rank : "Unrated"}
                      </span>
                    </>
                  ) : (
                    <Skeleton
                      className="h-[22px]"
                      baseColor="#1a1f2c"
                      width={"150px"}
                      highlightColor="#171923"
                      count={2}
                    />
                  )}
                </div>
              </div>
              <h3 className="mt-8 text-lg font-bold text-gray-800 dark:text-white">
                Stats
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {Object.keys(user).length ? (
                  <div className="p-4 bg-blue-100 dark:bg-blue-700 rounded-lg">
                    <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                      Recent Episode Matches
                    </h4>
                    <span className="text-gray-500 dark:text-gray-400">
                      {total_act_matches || "--"}
                    </span>
                  </div>
                ) : (
                  <Skeleton
                    className="h-[84px] py-4 rounded-lg space-y-4"
                    baseColor="#1a1f2c"
                    highlightColor="#171923"
                  ></Skeleton>
                )}
                {Object.keys(user).length ? (
                  <div className="p-4 bg-blue-100 dark:bg-blue-700 rounded-lg">
                    <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                      Recent Episode Wins
                    </h4>
                    <span className="text-gray-500 dark:text-gray-400">
                      {total_act_wins || "--"}
                    </span>
                  </div>
                ) : (
                  <Skeleton
                    className="h-[84px] py-4 rounded-lg space-y-4"
                    baseColor="#1a1f2c"
                    highlightColor="#171923"
                  ></Skeleton>
                )}
              </div>
              <h3 className="mt-8 text-lg font-bold text-gray-800 dark:text-white">
                Act Match History
              </h3>
              {isLoading ? (
                <Skeleton
                  className="h-16 py-4 rounded-lg mt-4 space-y-4"
                  baseColor="#1a1f2c"
                  highlightColor="#171923"
                  count={5}
                />
              ) : (
                <div className="mt-4 space-y-4">
                  {!matchHistory.length && "No recent matches found"}
                  {matchHistory.map(({ is_win, map, kda, score }, i) => {
                    const outcomeText = is_win ? "Win" : "Loss";
                    const outcomeColour = is_win ? "#228b22" : "#800000";
                    return (
                      <div
                        key={i}
                        style={{ backgroundColor: outcomeColour }}
                        className={`flex items-center justify-between px-4 py-2 rounded-lg`}
                      >
                        <div>
                          <span className="block text-white-800 dark:text-white-200">
                            Map: {map}
                          </span>
                          <span className="text-sm text-white-500 dark:text-white-400">
                            Outcome: {outcomeText}
                          </span>
                        </div>
                        <div>
                          <span className="block text-white-800 dark:text-white-200">
                            KDA: {kda}
                          </span>
                          <span className="text-sm text-white-500 dark:text-white-400">
                            Score: {score}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
