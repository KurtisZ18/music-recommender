import requests
import logging
from typing import Dict, List, Optional
from django.conf import settings

logger = logging.getLogger(__name__)

class LastFMClient:
    BASE_URL = "http://ws.audioscrobbler.com/2.0/"
    
    def __init__(self):
        self.api_key = settings.LASTFM_API_KEY
        
    def _make_request(self, method: str, params: Dict) -> Dict:
        try:
            params.update({
                'method': method,
                'api_key': self.api_key,
                'format': 'json'
            })
            
            logger.debug(f"Making Last.fm API request: {method} with params: {params}")
            response = requests.get(self.BASE_URL, params=params)
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Last.fm API request failed: {str(e)}")
            raise
    
    def search_track(self, query: str, limit: int = 1) -> Dict:
        try:
            search_params = {
                'track': query,
                'limit': 1
            }
            search_result = self._make_request('track.search', search_params)
            tracks = search_result.get('results', {}).get('trackmatches', {}).get('track', [])
            
            if not tracks:
                logger.debug(f"No tracks found for query: {query}")
                return {}
                
            first_track = tracks[0]
            
            track_info_params = {
                'track': first_track['name'],
                'artist': first_track['artist'],
            }
            
            track_info = self._make_request('track.getInfo', track_info_params)
            return track_info.get('track', {})
            
        except Exception as e:
            logger.error(f"Error in search_track: {str(e)}")
            return {}
            
    def get_similar_tracks(self, artist: str, track: str, limit: int = 12) -> List[Dict]:
        try:
            params = {
                'artist': artist,
                'track': track,
                'limit': limit
            }
            
            result = self._make_request('track.getSimilar', params)
            return result.get('similartracks', {}).get('track', [])
            
        except Exception as e:
            logger.error(f"Error in get_similar_tracks: {str(e)}")
            return []
        
    def search_artist(self, query: str, limit: int = 1) -> Dict:
        try:
            search_result = self._make_request('artist.search', {'artist': query, 'limit': 1})
            artists = search_result.get('results', {}).get('artistmatches', {}).get('artist', [])
            
            if not artists:
                return {}
                
            first_artist = artists[0]
            artist_info = self._make_request('artist.getInfo', {'artist': first_artist['name']})
            return artist_info.get('artist', {})
        except Exception as e:
            logger.error(f"Error in search_artist: {str(e)}")
            return {}
    
    def get_similar_artists(self, artist: str, limit: int = 12) -> List[Dict]:
        try:
            result = self._make_request('artist.getSimilar', {
                'artist': artist,
                'limit': limit
            })
            return result.get('similarartists', {}).get('artist', [])
        except Exception as e:
            logger.error(f"Error in get_similar_artists: {str(e)}")
            return []