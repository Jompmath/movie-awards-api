import { Request, Response } from 'express';
import { MovieService } from '../services/MovieService';

export class MovieController {
  private service: MovieService;

  constructor() {
    this.service = new MovieService();
  }

  async getProducerIntervals(req: Request, res: Response): Promise<void> {
    try {
      const intervals = await this.service.getProducerIntervals();
      res.json(intervals);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 