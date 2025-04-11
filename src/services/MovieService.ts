import { Movie, ProducerInterval, ProducerIntervals } from '../models/Movie';
import { MovieRepository } from '../repositories/MovieRepository';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';

export class MovieService {
  private repository: MovieRepository;

  constructor() {
    this.repository = new MovieRepository();
  }

  async importMoviesFromCSV(filePath: string): Promise<void> {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      delimiter: ';',
      skip_empty_lines: true
    });

    for (const record of records) {
      const movie: Movie = {
        year: parseInt(record.year),
        title: record.title,
        studios: record.studios,
        producers: record.producers,
        winner: record.winner === 'yes'
      };
      await this.repository.insertMovie(movie);
    }
  }

  async getProducerIntervals(): Promise<ProducerIntervals> {
    const winnerMovies = await this.repository.getWinnerMovies();
    const producerWins = new Map<string, number[]>();

    // Agrupando os anos de premiação por produtor
    for (const movie of winnerMovies) {
      const producers = movie.producers.split(',').map(p => p.trim());
      for (const producer of producers) {
        if (!producerWins.has(producer)) {
          producerWins.set(producer, []);
        }
        producerWins.get(producer)?.push(movie.year);
      }
    }

    const intervals: ProducerInterval[] = [];

    // Calculando os intervalos para cada produtor
    for (const [producer, years] of producerWins.entries()) {
      if (years.length < 2) continue;

      for (let i = 0; i < years.length - 1; i++) {
        intervals.push({
          producer,
          interval: years[i + 1] - years[i],
          previousWin: years[i],
          followingWin: years[i + 1]
        });
      }
    }

    // Encontrando os intervalos mínimo e máximo
    const minInterval = Math.min(...intervals.map(i => i.interval));
    const maxInterval = Math.max(...intervals.map(i => i.interval));

    return {
      min: intervals.filter(i => i.interval === minInterval),
      max: intervals.filter(i => i.interval === maxInterval)
    };
  }
} 