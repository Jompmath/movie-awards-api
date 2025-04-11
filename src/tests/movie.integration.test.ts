import request from 'supertest';
import express from 'express';
import { DatabaseConfig } from '../config/database';
import movieRoutes from '../routes/movieRoutes';
import { MovieService } from '../services/MovieService';
import * as path from 'path';

describe('Movie API Integration Tests', () => {
  let app: express.Application;

  beforeAll(async () => {
    await DatabaseConfig.initialize();
    
    // Import test data
    const movieService = new MovieService();
    const csvPath = path.join(__dirname, '../../movielist.csv');
    await movieService.importMoviesFromCSV(csvPath);

    app = express();
    app.use('/api', movieRoutes);
  });

  describe('GET /api/producers/intervals', () => {
    it('should return producer intervals', async () => {
      const response = await request(app)
        .get('/api/producers/intervals')
        .expect(200);

      expect(response.body).toHaveProperty('min');
      expect(response.body).toHaveProperty('max');
      
      // Verify the structure of the response
      expect(Array.isArray(response.body.min)).toBe(true);
      expect(Array.isArray(response.body.max)).toBe(true);

      // Verify the structure of interval objects
      if (response.body.min.length > 0) {
        const minInterval = response.body.min[0];
        expect(minInterval).toHaveProperty('producer');
        expect(minInterval).toHaveProperty('interval');
        expect(minInterval).toHaveProperty('previousWin');
        expect(minInterval).toHaveProperty('followingWin');
      }

      if (response.body.max.length > 0) {
        const maxInterval = response.body.max[0];
        expect(maxInterval).toHaveProperty('producer');
        expect(maxInterval).toHaveProperty('interval');
        expect(maxInterval).toHaveProperty('previousWin');
        expect(maxInterval).toHaveProperty('followingWin');
      }
    });
  });
}); 