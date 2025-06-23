export interface Pokemon {
	name:                     string;
	stats:                    Stat[];
	weight:                   number;
	height:                   number;
}

export interface Stat {
	base_stat: number;
	effort?:    number;
	stat:      Species;
}

export interface Species {
	name: string;
	url?:  string;
}
