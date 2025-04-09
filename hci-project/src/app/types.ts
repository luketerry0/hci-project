export enum UPGRADES {
    HEAVY_BALL_MULTIPLIER,
    INVERSE_BOUNCE_MULTIPLER,
    SMALL_BALL_MULTIPLER,
    NEW_TEST,
    AUTOTYPER,
    BUCKET_VAL_MULTIPLIER
}

export type UpgradeObject = {
    [key in UPGRADES]: number;
};

export type GameState = {
    rows: number,
    max_bucket : number,
    min_bucket : number,
    spacing_between_pegs: number,
    peg_radius: number,
    ball_radius: number
  }