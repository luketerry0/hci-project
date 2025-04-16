// this file defines types that are used throughout the application. 

// an enum to keep track of the upgrades available
export enum UPGRADES {
    HEAVY_BALL_MULTIPLIER,
    INVERSE_BOUNCE_MULTIPLER,
    SMALL_BALL_MULTIPLER,
    NEW_TEST,
    AUTOTYPER,
    BUCKET_VAL_MULTIPLIER,
    AUTOTYPER_SPEED,
    REMOVE_PEG
}

// A type to represent a set of key:value pairs with keys corresponding to upgrades
// used for things like upgrade costs and how many times they've been purchased
export type UpgradeObject = {
    [key in UPGRADES]: number;
};

// a type to keep track of parameters that affect gameplay.
export type GameState = {
    rows: number, // rows in the plinko board
    max_bucket : number, // the value of the most valuable bucket
    min_bucket : number, // the value of the least valuable bucket
    spacing_between_pegs: number, // spacing between pegs in px
    peg_radius: number, // the radius of pegs in px
    ball_radius: number // the radius of each ball dropped in px
  }