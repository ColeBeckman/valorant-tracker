import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileState, setProfileState] = useState();
  const [matchHistory, setMatchHistory] = useState([]);
  const { accountInfo, accountMMR } = profileState || {};
  const { name, account_level, card, region, tag } = accountInfo || {};
  const { by_season, current_data, images, highest_rank } = accountMMR || {};
  const searchParams = useSearchParams();
  const profileName = searchParams.get("name");
  const profileTag = searchParams.get("tag");

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await fetch(
        `/api/search?name=${profileName}&tag=${profileTag}`
      );
      const jsonResult = await result.json();
      setProfileState(jsonResult);
    };
    const fetchMatchHistory = async () => {
      const result = await fetch(
        `/api/matches?name=${profileName}&tag=${profileTag}`
      );
      const jsonResult = await result.json();
      setMatchHistory(jsonResult);
      setIsLoading(false);
    };
    if (profileName && profileTag) {
      fetchProfile();
      fetchMatchHistory();
    }
  }, [profileName, profileTag]);

  if (!profileState) return null;
  const recentMatches = matchHistory.map((match) => {
    const myPlayer = match.players.all_players.find((player) => {
      const matchAccount = player.name === name && player.tag === tag;
      return matchAccount;
    });
    const { map } = match.metadata;
    const winningTeam = match.teams.blue.has_won ? "Blue" : "Red";
    const isWin = winningTeam === myPlayer.team;
    return { myPlayer, map, isWin };
  });
  const seasonsArray = Object.values(by_season);
  const latestSeason = seasonsArray[seasonsArray.length - 1];
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="px-6 py-4 bg-white shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <Link
            className="text-2xl font-bold text-gray-800 dark:text-white"
            href="#"
          ></Link>
          <nav className="space-x-4">
            <Link className="text-gray-800 dark:text-white" href="/">
              Home
            </Link>
            <Link className="text-gray-800 dark:text-white" href="#">
              Logout
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Peak Rank: {highest_rank.patched_tier}
          </h2>
          <div className="flex items-center space-x-4 mt-4">
            <img
              alt="Avatar"
              className="rounded-full"
              height="80"
              src={card.small}
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width="80"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {name} #{tag}
              </h3>
              <span className="text-gray-500 dark:text-gray-400">
                Level: {account_level}{" "}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {current_data.currenttierpatched}
              </span>
            </div>
          </div>
          <h3 className="mt-8 text-lg font-bold text-gray-800 dark:text-white">
            Stats
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-700 rounded-lg">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                Total Act Matches:
              </h4>
              <span className="text-gray-500 dark:text-gray-400">
                {latestSeason.number_of_games}
              </span>
            </div>
            <div className="p-4 bg-blue-100 dark:bg-blue-700 rounded-lg">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">
                Total Act Wins
              </h4>
              <span className="text-gray-500 dark:text-gray-400">
                {latestSeason.wins}
              </span>
            </div>
          </div>
          <h3 className="mt-8 text-lg font-bold text-gray-800 dark:text-white">
            Recent Matches
          </h3>
          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <div className="mt-4 space-y-4">
              {recentMatches.map((match, i) => {
                const { assists, deaths, kills, score } = match.myPlayer.stats;
                const KDA = `${kills}/${deaths}/${assists}`;
                const outcomeText = match.isWin ? "Win" : "Loss";
                const outcomeColour = match.isWin ? "#228b22" : "#800000";
                console.log(outcomeText);
                console.log(outcomeColour);
                return (
                  <div
                    key={i}
                    style={{ backgroundColor: outcomeColour }}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg`}
                  >
                    <div>
                      <span className="block text-white-800 dark:text-white-200">
                        Map: {match.map}
                      </span>
                      <span className="text-sm text-white-500 dark:text-white-400">
                        Outcome: {outcomeText}
                      </span>
                    </div>
                    <div>
                      <span className="block text-white-800 dark:text-white-200">
                        KDA: {KDA}
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
      </main>
    </div>
  );
}
