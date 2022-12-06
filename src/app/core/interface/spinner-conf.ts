import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

export interface SpinnerConf {
  color: ThemePalette;
  diameter: number;
  mode: ProgressSpinnerMode;
  value: number;
}

