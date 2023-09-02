import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PaginationDto, SearchDto } from './app.dto';
import { DEEZER_API_URL } from './constants/constant';
import { QuickHttpService } from './quick-http.service';

@Injectable()
export class AppService {
  constructor(private readonly httpService: QuickHttpService) {}

  // async getArtist(id: number, page =1, limit = 10): Promise<any>{
  //   //we are making call to this api: https://api.deezer.com/artist/
  //   const topTracksResponse = await axios.get(`https://api.deezer.com/artist/${id}/top?index=${page}&limit=${limit}`)
  //   const albumsResponse = await axios.get(`https://api.deezer.com/artist/${id}/albums?index=${page}&limit=${limit}`)
  //   const artistResponse = await axios.get(`https://api.deezer.com/artist/${id}`)
  //   const relatedArtistsResponse = await axios.get(`https://api.deezer.com/artist/${id}/related?index=${page}&limit=${limit}`)
  //   return {
  //     topTracks: topTracksResponse.data,
  //     albums: albumsResponse.data,
  //     artist: artistResponse.data,
  //     relatedArtists: relatedArtistsResponse.data
  //   }
  // }

  // async searchTracks(query: string, page =1, limit = 10): Promise<any>{
  //   //we are making call to this api: https://api.deezer.com/search/track
  //   const response = await axios.get(`https://api.deezer.com/search/track?q=${query}&index=${page}&limit=${limit}`)
  //   return response.data
  // }

  async getArtist(id: number, pg: PaginationDto): Promise<any> {
    try {
      const { page, limit } = pg;
      const topTracksResponse = await this.httpService.request(
        `${DEEZER_API_URL}/artist/${id}/top?index=${page}&limit=${limit}`,
        'get',
        null,
        null,
        null,
      );
      const albumsResponse = await this.httpService.request(
        `${DEEZER_API_URL}/artist/${id}/albums`,
        'get',
        null,
        null,
        null,
      );
      const artistResponse = await this.httpService.request(
        `${DEEZER_API_URL}/artist/${id}`,
        'get',
        null,
        null,
        null,
      );
      const relatedArtistsResponse = await this.httpService.request(
        `${DEEZER_API_URL}/artist/${id}/related`,
        'get',
        null,
        null,
        null,
      );
      return {
        topTracks: topTracksResponse[4],
        albums: albumsResponse[4],
        artist: artistResponse[4],
        relatedArtists: relatedArtistsResponse[4],
      };
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async searchTracks(data: SearchDto): Promise<any> {
    try {
      const { page, limit, query } = data;
      const response = await this.httpService.request(
        `${DEEZER_API_URL}/search/track?q=${query}&index=${page}&limit=${limit}`,
        'get',
        null,
        null,
        null,
      );
      return response[4];
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
