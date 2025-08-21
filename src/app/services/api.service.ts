import { Injectable } from '@angular/core';
import { 
  getCharacter,
  getCharacters,
  CharacterFilter,
  getEpisode,
  getEpisodes,
  getLocation,
  getLocations,
  Character,
  Episode,
  Location,
  EpisodeFilter,
  LocationFilter,
} from 'rickmortyapi'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  async getMultipleCharacters(id: number[]): Promise<Character[] | Character> {
    const character = await getCharacter(id);
    if(character.status === 200) {
      return character.data
    } else {
      if(id.length === 1) {
        throw new Error(`Failed to fetch character ${id} with status message: ${character.statusMessage}`);
      } else {
        throw new Error(`Failed to fetch characters ${id.join(', ')} with status message: ${character.statusMessage}`);
      }
    }
  }
  async getCharacter(id: number): Promise<Character> {
    return await this.getMultipleCharacters([id]) as Character
  }

  async getEpisode(id: number): Promise<Episode> {
    const episode = await getEpisode(id);
    if(episode.status === 200) {
      return episode.data
    } else {
      throw new Error(`Failed to fetch episode ${id} with status message: ${episode.statusMessage}`);
    }
  }

  async getLocation(id: number): Promise<Location> {
    const location = await getLocation(id);
    if(location.status === 200) {
      return location.data
    } else {
      throw new Error(`Failed to fetch location ${id} with status message: ${location.statusMessage}`);
    }
  }

  async getLocations(page: number = 1, filter: LocationFilter = {}): Promise<{ locations: Location[], pages: number, items: number }> {
    const locations = await getLocations({ page, ...filter });
    if(locations.status === 200 || !locations.data.info) {
      return {
        locations: locations.data.results || [],
        pages: locations.data.info?.pages || 0,
        items: locations.data.info?.count || 0
      }
    } else {
      throw new Error(`Failed to fetch locations with status message: ${locations.statusMessage}`);
    }
  }

  async getCharacters(page: number, filter: CharacterFilter = {}): Promise<{ characters: Character[], pages: number, items: number }> {
    const characters = await getCharacters({ page, ...filter });
    if(characters.status === 200 || !characters.data.info) {
      return {
        characters: characters.data.results || [],
        pages: characters.data.info?.pages || 0,
        items: characters.data.info?.count || 0
      }
    } else {
      throw new Error(`Failed to fetch characters with status message: ${characters.statusMessage}`);
    }
  }

  async getEpisodes(page: number, filter: EpisodeFilter = {}): Promise<{ episodes: Episode[], pages: number, items: number }> {
    const episodes = await getEpisodes({ page, ...filter });
    if(episodes.status === 200 || !episodes.data.info) {
      return { 
        episodes: episodes.data.results || [],
        pages: episodes.data.info?.pages || 0,
        items: episodes.data.info?.count || 0
      }
    } else {
      throw new Error(`Failed to fetch episodes with status message: ${episodes.statusMessage}`);
    }
  }

  async getCharactersInDimension(dimension: string): Promise<{ residents: string[], locations: Location[] }> {
    const locations = await getLocations({ dimension });
    if(locations.status !== 200 || !locations.data.info) {
      throw new Error(`Failed to fetch characters in dimension ${dimension} with status message: ${locations.statusMessage}`);
    } 

    const allResidents: string[] = []
    const allLocations: Location[] = [...locations.data.results || []];
    for(const location of locations.data.results || []) {
      allResidents.push(...location.residents);
    }

    const totalPages = locations.data.info?.pages || 0;
    for(let page = 2; page <= totalPages; page++) {      
      const moreLocations = await getLocations({ dimension, page });
      if(moreLocations.status === 200 && moreLocations.data) {
        allLocations.push(...moreLocations.data.results || []);
        for(const location of moreLocations.data.results || []) {
          allResidents.push(...location.residents);
        }
      } else {
        throw new Error(`Failed to fetch characters in dimension ${dimension} with status message: ${moreLocations.statusMessage}`);
      }
    }
    return {
      residents: allResidents,
      locations: allLocations
    }
  }

  async getAllDimensions(): Promise<{ name: string; id: number }[]> {
    const locations = await getLocations();
    
    if(locations.status !== 200 || !locations.data.info) {
      throw new Error(`Failed to fetch all dimensions with status message: ${locations.statusMessage}`);
    }

    const allDimensionNames:string[] = []
    const results: { name: string; id: number }[] = [];
    
    for(const location of locations.data.results || []) {      
      if(!allDimensionNames.includes(location.dimension)) {
        results.push({ name: location.dimension, id: location.id });
      }
      allDimensionNames.push(location.dimension);
    }

    const totalPages = locations.data.info?.pages || 0;
    for(let page = 2; page <= totalPages; page++) {      
      const moreLocations = await getLocations({ page });
      if(moreLocations.status === 200 && moreLocations.data) {
        for(const location of moreLocations.data.results || []) {
          if(!allDimensionNames.includes(location.dimension)) {
            results.push({ name: location.dimension, id: location.id });
          }
          allDimensionNames.push(location.dimension);
        }
      } else {
        throw new Error(`Failed to fetch dimensions with status message: ${moreLocations.statusMessage}`);
      }
    }
    return results
  }
}