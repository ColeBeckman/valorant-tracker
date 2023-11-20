import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LinkButton } from "@/components/LinkButton";
import { useState } from "react";

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
    <div className="flex w-screen h-screen justify-center items-center space-x-2">
      <div className="flex max-w-screen-lg items-center flex-col">
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
        <div>
          <LinkButton
            disabled={!playerName || !playerTag}
            href={`/profile?name=${playerName}&tag=${playerTag}`}
          >
            Search
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
