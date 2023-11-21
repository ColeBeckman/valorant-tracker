import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LinkButton } from "@/components/LinkButton";
import { useState } from "react";
import { NavBar } from "@/components/NavBar";

export default function Component() {
  const [playerName, setPlayerName] = useState("");
  const [playerTag, setPlayerTag] = useState("");

  function handlePlayerNameChange(e) {
    setPlayerName(e.target.value);
  }

  function handlePlayerTagChange(e) {
    setPlayerTag(e.target.value);
  }

  return (
    <div className="flex w-screen flex-col h-screen bg-valorant">
      <header className="px-6 py-4 bg-white shadow-md dark:bg-gray-800">
        <NavBar />
      </header>
      <div className="flex max-w-screen-lg mx-auto justify-center h-full gap-2 items-center flex-col">
        <div className="flex bg-gray-800 flex-col ">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="space-y-2">
              <Label htmlFor="player-name">Player Name</Label>
              <Input
                id="player-name"
                placeholder="Enter player name"
                onChange={handlePlayerNameChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="player-tag">Player Tag</Label>
              <Input
                id="player-tag"
                maxLength="4"
                placeholder="# Enter player tag"
                onChange={handlePlayerTagChange}
              />
            </div>
          </div>
          <div className="w-full h-10 bg-gray-800 text-center flex items-center rounded-md justify-center">
            <LinkButton
              disabled={!playerName || !playerTag}
              href={`/profile?name=${playerName}&tag=${playerTag}`}
            >
              Search
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
