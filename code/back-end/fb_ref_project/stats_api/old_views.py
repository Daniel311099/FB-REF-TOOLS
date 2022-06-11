from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed

import jwt

from .models import Player, Frame, UserFrame, Column
from users.models import User
from .serializer import StatTableSerializer

class FrameData(APIView):

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
        response_set = frame.standard_stats_frame_records.all()[:rows]
        # player = Player.objects.get(name='Paul Pogba')
        # response = player.record_set.all()
        
        data = StatTableSerializer(response_set, many=True).data
        print(data)
        # response_data = [StatTableSerializer(frame).data() for frame in response_set]
        response = {'data': data}
        # response[]
        return JsonResponse(response, safe=False) 

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

class CustomTables(APIView):

    def get(self, request, *args, **kwargs):
        return JsonResponse({})

    def post(self, request, *args, **kwargs):
         data = request.data

