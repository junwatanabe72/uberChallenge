import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { userSettingState } from "../../store/atom";
import { Typography } from "@mui/material";

const marks = [
  {
    value: 0,
    label: "0m",
  },
  {
    value: 750,
    label: "750m",
  },
  {
    value: 1500,
    label: "1500m",
  },
];
const circleRange = "Change Circle";
const SliderMarks: React.FC = () => {
  const [userSetting, setUserSetting] = useRecoilState(userSettingState);
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    console.log("change");
    setUserSetting({ ...userSetting, circleRange: newValue as number });
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <Box px={3} sx={{ maxWidth: 150 }}>
        <Typography gutterBottom>{circleRange}</Typography>
        <Slider
          key={`slider-${userSetting.circleRange}`}
          aria-label="circleRange"
          defaultValue={userSetting.circleRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          marks={marks}
          step={100}
          min={0}
          max={1500}
          color="secondary"
        />
      </Box>
    </Box>
  );
};

export default SliderMarks;
