from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed

import jwt

from .models import Player, Frame, UserFrame, Column, Record, CustomFrame
from users.models import User

class FrameIds(APIView):
    
    def get(self, request, *args, **kwargs):
        user = User.objects.get(id=self.get_id(request))
        user_frames = user.user_frames.all()
        u_frame_ids = [u_frame.frame_id for u_frame in user_frames]
        frame_ids = [Frame.objects.get(id=u_frame_id).frame_id for u_frame_id in u_frame_ids]
        return JsonResponse({'frame_ids': frame_ids}, safe=False)

    def get_id(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated!")
        
        return payload['id']


class AbstractFrameView():

    def get_player_stats(self, player, columns):
        # columns = list(map(lambda col: col.column_id, frame.frame_columns.all()))
        # columns = frame.frame_columns.all()
        print(columns)
        records = [player.player_records.get(column=col) for col in columns]
        json_records = {record.column.column_type.name: record.get_val() for record in records}
        return json_records

    def get_data(self, players, columns):
        data = []
        for player in players:
            player_obj = Player.objects.get(player_id=player.player_id)
            player_records = {
                'name': player_obj.name,
                'player_id': player_obj.player_id,
                'stats': self.get_player_stats(player=player_obj, columns=columns)
            }
            data.append(player_records)
        return data

class StandardFrameView(APIView, AbstractFrameView):

    def get(self, request, *args, **kwargs):
        print(args, kwargs)
        # year, rows = kwargs['year'], kwargs['rows']
        rows = kwargs['rows']
        frame_id = kwargs['frame_id']
        # frame_id = f'{year}_Big5EuropeanLeagues_Standard Stats_players'
        # user = User.objects.get(id=self.get_id(request))
        try:
            print(frame_id)
            frame = Frame.objects.get(frame_id=frame_id)
            
        except Frame.DoesNotExist:
            return JsonResponse({'error': 'frame not found'}, safe=False)
        columns = frame.frame_columns.all()
        
        # player = Player.objects.get(name='Paul Pogba')
        # response = player.record_set.all()
        get_players_sql = f"""
                    SELECT DISTINCT 1 as id, stats_api_player.player_id
                    FROM stats_api_record
                    LEFT JOIN stats_api_player
                    ON stats_api_record.player_id = stats_api_player.id
                    LEFT JOIN stats_api_column
                    ON stats_api_record.column_id = stats_api_column.id
                    LEFT JOIN stats_api_frame
                    ON stats_api_column.frame_id = stats_api_frame.id
                    WHERE stats_api_frame.frame_id = '{frame_id}' 
                    """ 
        
        players = Record.objects.raw(get_players_sql)[:rows]
        # data = [{
        #     'name': player.name,
        #     'player_id': player.id,
        #     'stats': Record.objects.filter(player_id=player.id), # map this,
        # } for player in players]
        data = self.get_data(players=players, columns=columns)
        # for player in players:
        #     player_obj = Player.objects.get(player_id=player.player_id)
        #     player_records = {
        #         'name': player_obj.name,
        #         'player_id': player_obj.player_id,
        #         'stats': self.get_stats(player=player_obj, columns=columns)
        #     }
        #     data.append(player_records)
    
        # data = StatTableSerializer(response_set, many=True).data
        print(data)
        # response_data = [StatTableSerializer(frame).data() for frame in response_set]
        response = {'data': data}
        # response[]
        return JsonResponse(response, safe=False) 


class CustomFrameView(APIView, AbstractFrameView):

    def get(self, request, *args, **kwargs):
        response = {}
        rows = kwargs['rows']
        frame_id = kwargs['frame_id']
        try:
            print(frame_id)
            frame = Frame.objects.get(frame_id=frame_id)
            
        except CustomFrame.DoesNotExist:
            return JsonResponse({'error': 'custom frame not found'}, safe=False)

        columns = frame.frame_columns.all()
        players = frame.frame_players.all()[:rows]

        data = self.get_data(players=players, columns=columns)
        response['data'] = data
        
        return JsonResponse({'data': data})

    def post(self, request, *args, **kwargs):
         data = request.data