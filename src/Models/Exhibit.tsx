export interface Exhibit {
    Id: number;
    Title: string;
    YearOfCreation: number;
    Price: number;
    Technique: string;
    DateOfSale?: string;
    ArtistId?: number;
    Artist?: string; 
    imageUrl?: string;
  }