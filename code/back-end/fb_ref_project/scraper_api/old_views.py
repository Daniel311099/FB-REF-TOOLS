from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.apps import apps

from rest_framework.views import APIView

from .scripts.fbref_tools import get_page, get_dict, get_url
from stats_api.models import Player, Frame, StandardStats
from users.models import User

class AddFrame(APIView):

    def scrape_table(self, year):
        page = get_page(get_url(int(year)))
        data = get_dict({'id': "stats_standard"}, page)
        cols = ['player', 'squad', 'games_starts', 'minutes', 'goals', 'assists', 'xg', 'xa']
        clean_data = [{col:tr[col] for col in cols} for tr in data] #remove columns
        return clean_data

    def get_set(self, frame): #gets the record_set method for a given frame
        stat_type = frame.frame_type
        f_stat_type = '_'.join(stat_type.lower().split(" ")) + '_frame_records'
        frame_set = getattr(frame, f_stat_type)
        return frame_set

    def post(self, request, *args, **kwargs):
        print('req')
        table = request.data
        rows, year, comp, frame_type, subject, email = table['rows'], table['year'], table['comp'], table['type'], table['subject'], table['email']
        frame_id = f'{year}_{comp}_{"".join(frame_type.split())}_{subject}'
        response = {}
        user = User.objects.get(email=email)
        try:
            frame = Frame.objects.get(frame_id=frame_id) 
            frame_records = self.get_set(frame)
            print(frame_records.all())
            response['frame_exists'] = True
        except Frame.DoesNotExist:
            # crate new frame
            clean_data = self.scrape_table(year)
            # create new frame
            frame = Frame(frame_id=frame_id, comp=comp, frame_type=frame_type, subject=subject)
            frame.save()
            
            # frame.frame_users.create(user=request.user)
            # type_model = apps.get_model('stats_api', frame_type)
            # frame_records = getattr(frame, frame_type)
            frame_records = self.get_set(frame)
            for row in clean_data:
                record_id = row['player']+row['squad']+frame_id
                player_id = row['player']+row['squad']
                try:
                    player = Player.objects.get(player_id=player_id)
                except Player.DoesNotExist:
                    player = Player(player_id=player_id, name=row['player'])
                    player.save()
                del row['player']
                del row['squad'] #remove name
                print(row)
                frame_records.create(record_id=record_id, player=player, **row)
            response['frame_exists'] = False
        user.user_frames.create(frame=frame)
        print(response)
        return JsonResponse(response, safe=False)

        