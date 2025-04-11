import { Database } from 'sqlite3';
import { Movie } from '../models/Movie';
import { DatabaseConfig } from '../config/database';

// Adicionando esta interface para definir a estrutura da linha do banco de dados.
interface MovieRow {
    year: number;
    title: string;
    studios: string;
    producers: string;
    winner: number;
}

export class MovieRepository {
  private db: Database;

  constructor() {
    this.db = DatabaseConfig.getInstance();
  }

  async insertMovie(movie: Movie): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)',
        [movie.year, movie.title, movie.studios, movie.producers, movie.winner ? 1 : 0],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  async getWinnerMovies(): Promise<Movie[]> {
    return new Promise((resolve, reject) => {
      this.db.all<MovieRow>(
        'SELECT * FROM movies WHERE winner = 1 ORDER BY year',
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows.map(row => ({
            ...row,
            winner: Boolean(row.winner)
          })));
        }
      );
    });
  }
} 