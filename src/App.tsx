import React from "react";
import "./App.css";
import maps from "./maps.json";
import toons from "./heroes.json";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

enum COMPOSITION_ATTRIBUTES {
  ANCHOR = "anchor",
  AOE = "aoe",
  BOSS_CONTROL = "boss control",
  BURST_DAMAGE = "burst damage",
  CAMP_CLEAR = "camp clear",
  DOUBLE_SOAKER = "double soaker",
  ENGAGE = "engage",
  FOLLOWUP = "followup",
  GANKING = "ganking",
  GLOBAL = "global",
  HEALER = "healer",
  INSANE_CAMP_CLEAR = "insane camp clear",
  INSANE_WAVE_CLEAR = "insane wave clear",
  LATE_GAME = "late game",
  POINT_CONTROL = "point control",
  POKE = "poke",
  RACE = "race",
  ROAMERS = "roamers",
  ROTATION_DISRUPTION = "rotation disruption",
  SAFE_OFFLANE = "safe offlane",
  SIDE_LANERS = "side laners",
  SIEGE = "siege",
  SUSTAINED_DAMAGE = "sustained damage",
  SUSTAIN = "sustain",
  TANK = "tank",
  TEAM_FIGHT = "team fight",
  WAVE_CLEAR = "wave clear",
}

enum HERO_ATTRIBUTE {
  CROWD_CONTROL = "crowd control",
  OP = "op",
}

export const generalWants: COMPOSITION_ATTRIBUTES[] = [
  COMPOSITION_ATTRIBUTES.CAMP_CLEAR,
  COMPOSITION_ATTRIBUTES.BURST_DAMAGE,
  COMPOSITION_ATTRIBUTES.SUSTAINED_DAMAGE,
  COMPOSITION_ATTRIBUTES.HEALER,
  COMPOSITION_ATTRIBUTES.TANK,
  COMPOSITION_ATTRIBUTES.ENGAGE,
  COMPOSITION_ATTRIBUTES.FOLLOWUP,
];

interface IMap {
  name: string;
  id: number;
  needs: COMPOSITION_ATTRIBUTES[];
  wants: COMPOSITION_ATTRIBUTES[];
  strategy: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

/* TODO:
  - add tags to heroes
  - selectable heroes list
  - searchable heroes list
  - filterable heroes list
  - algorithm that looks at selected heroes, selected map and displays what else you need
*/

function App() {
  const classes = useStyles();
  const [heroesMap, setHeroesMap] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setHeroesMap(event.target.value as number);
  };

  const displayMapInfo = (id: number) => {
    const selectedMap = maps.find((mapItem) => mapItem.id === id);
    return (
      <>
        <h3>Map Needs</h3>
        <ul>
          {selectedMap?.needs.map((need) => {
            return <li key={need}>{need}</li>;
          })}
        </ul>
        <h3>Map Wants</h3>
        <ul>
          {selectedMap?.wants.map((want) => {
            return <li key={want}>{want}</li>;
          })}
        </ul>
        <h3>Strategy</h3>
        <div>{selectedMap?.strategy}</div>
      </>
    );
  };

  const displayToonInfo = () => {
    return (
      <>
        <h3>Heroes</h3>
        <ul>
          {toons?.map((toon) => {
            return <li key={toon.id}>{toon.name}</li>;
          })}
        </ul>
      </>
    );
  };

  return (
    <div className="App">
      <h1>HotS Drafter</h1>
      <h2>General Needs</h2>
      <ul>
        {generalWants.map((want) => {
          return <li key={want}>{want}</li>;
        })}
      </ul>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Map</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={heroesMap}
          onChange={handleChange}
        >
          {(maps as IMap[]).map((mapItem: IMap) => {
            return (
              <MenuItem key={mapItem.id} value={mapItem.id}>
                {mapItem.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {displayMapInfo(heroesMap)}
      {displayToonInfo()}
    </div>
  );
}

export default App;
