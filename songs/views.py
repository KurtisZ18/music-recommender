from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import logging
from .utils import LastFMClient

logger = logging.getLogger(__name__)


@require_http_methods(["GET"])
def search(request):
    try:
        query = request.GET.get('q', '').strip()
        search_type = request.GET.get('type', 'track')  # 'track' or 'artist'
        
        if not query:
            return JsonResponse({'error': 'Query parameter is required'}, status=400)
            
        client = LastFMClient()
        
        if search_type == 'artist':
            artist = client.search_artist(query)
            if not artist:
                return JsonResponse({
                    'artist': None,
                    'similar_artists': [],
                    'message': 'No artists found'
                })
                
            similar_artists = client.get_similar_artists(artist['name'])
            return JsonResponse({
                'artist': artist,
                'similar_artists': similar_artists
            })
        else:
            track = client.search_track(query)
            if not track:
                return JsonResponse({
                    'track': None,
                    'similar_tracks': [],
                    'message': 'No tracks found'
                })
                
            artist_name = track['artist']['name'] if isinstance(track['artist'], dict) else track['artist']
            similar_tracks = client.get_similar_tracks(artist_name, track['name'])
            return JsonResponse({
                'track': track,
                'similar_tracks': similar_tracks
            })
            
    except Exception as e:
        logger.error(f"Error in search view: {str(e)}", exc_info=True)
        return JsonResponse({
            'error': 'Internal server error',
            'details': str(e)
        }, status=500)