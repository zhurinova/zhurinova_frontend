import { Exhibit } from "./Exhibit";

export interface Artist {
    Id: number;
    FullName: string;
    SchoolOfPainting: string;
    DateOfBirth: string;
    Exhibits: Exhibit[]; 
  }

  export interface Artist2 {
    fullName: string;
    averagePrice: number;
    numberOfWorks: number
  }
  