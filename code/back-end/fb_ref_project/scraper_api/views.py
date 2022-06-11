from django.http import JsonResponse
# from back_end.django_server.fb_ref_project.scraper_api.scripts.fbref_tools import get_frame

from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
import jwt

# create sepreate module for view tools
# import scrpaer tools 
from .scripts.scraper_tools import get_url, get_frame, get_loc, get_page, parse

from stats_api.models import Player, Frame, Column, FrameType, ColumnType
from users.models import User

class AddFrame(APIView):

    def scrape_table(self, year, comp, frame_type, subject):
        url = get_url(frame_type=frame_type, year=year, comp=comp, subject=subject)
        page = get_page(url)
        loc = get_loc(frame_type=frame_type, year=year)
        frame = get_frame(locator=loc, doc=page)
        return frame
    
    def clean_frame(frame):
        cleaned_frame = frame
        return cleaned_frame

# # rewrite get_set and scrape_table
#     def get_set(self, frame): #gets the record_set method for a given frame
#         stat_type = frame.frame_type
#         f_stat_type = '_'.join(stat_type.lower().split(" ")) + '_frame_records'
#         frame_set = getattr(frame, f_stat_type)
#         return frame_set
    
    def get_frame_id(self, year, comp, frame_type, subject ):
        # year, comp, frame_type, subject = table['year'], table['comp'], table['type'], table['subject']
        frame_id = f'{year}_{comp}_{"".join(frame_type.split())}_{subject}'
        return frame_id
    
    def get_col_id(self, column_type, frame):
        col_id = f'{column_type.name}_{frame.frame_id}'
        return col_id

    def get_record_id(self, player, column):
        record_id = f'{player.player_id}_{column.column_id}'
        return record_id

    def get_frame(self, table, frame_id, frame_type):
        try:
            frame = frame_type.frame_type_frames.get(frame_id=frame_id) 
            # frame_columns = frame.frame_columns.all()
        except Frame.DoesNotExist:
            # frame_columns = []
            frame = frame_type.frame_type_frames.create(frame_id=frame_id, year=table['year'], comp=table['comp'])
            frame.save()
        return frame

    def get_frame_type(self, table):
        try:
            frame_type = FrameType.objects.get(name=table['frame_type'], subject=table['subject']) 
            # frame_columns = frame.frame_columns.all()
        except FrameType.DoesNotExist:
            # frame_columns = []
            frame_type = FrameType(name=table['frame_type'], subject=table['subject'])
            frame_type.save()
        return frame_type

    # def get_value(self, value): # try excepts to find type, return correct type
    #     return {self.get_data_type(): value}

    # def check_added(self, cols, num):
    #     for recs in cols.values():
    #         if len(recs) != num: return False
    #     return True

    def get_user_id(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated!")
        
        return payload['id']

    # def post(self, request, *args, **kwargs):
    #     requested_tables = request.data
    #     tables = parse(requested_tables)
    #     response = {}

    #     for table in tables:
    #         frame_id = self.get_frame_id(**table)
    #         user = User.objects.get(id=self.get_id(request))
    #         frame_type = self.get_frame_type(frame_type)
    #         frame = self.get_frame(table=table, frame_id=frame_id)
    #         frame_type.frame_type_frames.create()
    #         frame_records = self.get_set(frame)

    #         if not frame.cols_added:
    #             # when updating data check if cols are the same
    #             # delete frame.frame_columns
    #             data = self.scrape_table(**table)
    #             num_records = len(data)
    #             columns = data[0].keys()
    #             columns_added = {col: [] for col in columns}
    #             # create columns, check that frame_column.
    #             column_id = self.get_col_id()
    #             frame.frame_columns.create() # add try except 
    #             for row in data: # move into a function
    #                 record_id = row['player']+row['squad']+frame_id # change this
    #                 player_id = row['player']+row['squad'] # use fb_ref ids
                    
    #                 try:
    #                     player = Player.objects.get(player_id=player_id)
    #                 except Player.DoesNotExist:
    #                     player = Player(player_id=player_id, name=row['name'])
    #                     player.save()
    #                 del row['player']
    #                 del row['squad'] # remove name
    #                 # map row object to object array then serialize 

    #                 serialized_row = RecordSerializer(data=row, many=True)
    #                 serialized_row.is_valid(raise_exception=True)
    #                 serialized_row.save()
    #                 player.player_records.bulk_create(serialized_row)

    #                 for col, val in row.items():      
    #                     # use serializer to create multiple records, move logic to serializer
    #                     column = frame.frame_columns.get(name=col)
    #                     record = {'record_id': self.get_record_id(), 'player': player}
    #                     # check if record exists to update
    #                     value = self.get_value(val)
    #                     record += value
    #                     column.column_records.create(**record)
    #                     if record 
    #                     columns_added[col].append(True) # incaement counter instead

    #                 # frame_records.create(record_id=record_id, player=player, **row)
    #             data_added = self.check_added(cols=columns_added, num=num_records)
    #             if data_added: 
    #                 frame.cols_added = True
    #             else:
    #                 frame.delete()
    #                 # try again
    #             response['frame_exists'] = False
    #         user.user_frames.create(frame=frame)
    #     return JsonResponse(response)

# cases; 
    def post(self, request, *args, **kwargs):
        requested_tables = request.data
        tables = parse(requested_tables)
        # tables = requested_tables
        user = User.objects.get(id=self.get_user_id(request))
        response = {}
        for table in tables:
            frame_id = self.get_frame_id(**table)
            frame_type = self.get_frame_type(table)
            frame = self.get_frame(table=table, frame_id=frame_id, frame_type=frame_type)

            print(frame.cols_added)
            if frame.cols_added:
                columns = frame.frame_columns.filter(records_added=False)
                print(columns, 'cols')
                if len(columns) == 0: # records for each column have been saved
                    user_frame = user.user_frames.filter(frame=frame)
                    if user_frame: # true if user has already saved that frame
                        response[frame_id] = 'already in table'
                    else:
                        user.user_frames.create(frame=frame)
                        response[frame_id] = 'frame exists, added'
                    # user.user_frames.create(frame=frame)
                    continue
                else:
                    frame.frame_columns.all().delete()
            
            records_set = self.scrape_table(**table) # make async
            columns = self.create_cols(row=records_set[0], table=table, frame=frame) # dict with pairs {col_name: column object}, checks if the column_type exists firsts
            if frame.cols_added: 
                # if all(map(lambda col: col.records_added, frame.frame_columns.all())):
                    
                self.add_records(data=records_set, columns=columns, frame=frame)

            user_frame = user.user_frames.filter(frame=frame)
            if user_frame: # true if user has already saved that frame
                response[frame_id] = 'already in table'
            else:
                user.user_frames.create(frame=frame)
        
        return JsonResponse(response)

    def create_cols(self, row, table, frame, count=0):
        if count > 5: 
            print('error create cols failed 5 times')
            return
        # print(row, table)
        print(list(row['data'].keys())[10], 1)
        col_names = set(row['data'].keys()).copy()

        columns = {}
        for col, val in row['data'].items(): # col may need to be parsed/formatted, use serializer
            # print(col, val)
            try:
                column_type = ColumnType.objects.get(name=col)
            except ColumnType.DoesNotExist:
                data_type = type(val).__name__
                print(data_type)
                column_type = ColumnType(name=col, data_type=data_type)
                print(column_type)
                column_type.save()
            column_id = self.get_col_id(column_type, frame)
            column = frame.frame_columns.create(column_id=column_id, column_type=column_type)
            columns[col] = column
        created_cols = frame.frame_columns.all()
        print([col.column_type.name for col in created_cols][10])

        if set([col.column_type.name for col in created_cols]) != col_names:
            print(2)
            frame.frame_columns.all().delete
            count += 1
            self.create_cols(row, table, frame, count)
        else:
            frame.cols_added = True
            frame.save()
        return columns

    def add_records(self, data, columns, frame, count=0):
        if count > 5: 
            print('error add records failed 5 times')
            return

        records_added = {col: 0 for col in columns.keys()}
        print(columns)
        for row in data:
            player_id = row['id']
            try:
                player = Player.objects.get(player_id=player_id)
            except Player.DoesNotExist:
                player = Player(player_id=player_id, name=row['name'])
                player.save()
            # del row['player']
            # del row['squad'] # remove name

            records = row['data'].copy()
            for col, val in records.items():
                try:
                    column = columns[col]
                    # print(column)
                except KeyError:
                    print(23)
                record_id = self.get_record_id(player=player, column=column)
                data_type = column.column_type.data_type
                record_data = {f'{data_type}_value': val, 'record_id': record_id, 'player': player}
                record = column.column_records.create(**record_data)
                if record.get_val() == val: 
                    records_added[col] += 1
                else:
                    print(record.get_val(), val, col)
        
        for col_name, col in columns.items():
            print(records_added[col_name], len(data), col_name)
            if records_added[col_name] == len(data):
                col.records_added = True
                col.save()
        # if all(list(map(lambda col: col.records_added, columns.values()))):
        #     frame.cols_added = True
            else:
                for col_n in frame.frame_columns.all():
                    col_n.column_records.all().delete()
                count += 1
                self.add_records(data, columns, frame, count)

        # data_added = (sum(records_added.values()) == len(data)*len(data[0].keys())) # checks that every record has been added
        # if data_added:
        #     frame.cols_added = True
        # else:
        #     for col_n in frame.frame_columns:
        #         col_n.column_records.delete()
        #     count += 1
        #     self.add_records(data, columns, frame, count)