
    export class Self {
        href: string;
    }

    export class Links {
        self: Self;
        movie: Self;
    }

    export class Movie {
        category: string;
        title: string;
        description: string;
        _links: Links;
    }

    export class Embedded {
        movies: Movie[];
    }

    export class Page {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    }

    export class MoviePage {
        _embedded: Embedded;
        _links: Links;
        page: Page;
    }


