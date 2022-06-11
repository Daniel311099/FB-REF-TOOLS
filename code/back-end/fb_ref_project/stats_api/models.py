from django.db import models
# from django.contrib.auth.models import User
from users.models import User
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

class FrameType(models.Model):
    # user_id
    # frame_id = models.CharField(max_length=100)#use string as it may need to be alphanumeric
    # comp = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=50)
    # url
    # class_name
    # cols_added = models.BooleanField(default=False, null=True)
    # datetime_added

# columns: column_id, frame_id, metadata

# class Subjects():
#     name = ''

class Frame(models.Model):
    frame_id = models.CharField(max_length=100)#use string as it may need to be alphanumeric
    frame_type = models.ForeignKey(FrameType, on_delete=models.CASCADE, related_name="frame_type_frames", null=True)
    year = models.IntegerField(null=True)
    comp = models.CharField(max_length=100)
    cols_added = models.BooleanField(default=False, null=True)

    def __str__(self) -> str:
        return self.frame_id

class Player(models.Model):
    player_id = models.IntegerField(max_length=100) #change to integer, use fb_ref ids
    name = models.CharField(max_length=100)
    # nationality
    # team, etc

    def __str__(self) -> str:
        return self.name

# cannot store set of records by reference from column as it forces you to use full col or some non arbitrary

class AbstractBaseColumn(models.Model):
    class Meta:
        abstract = True

    column_id = models.CharField(max_length=100)
    # content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    # object_id = models.PositiveIntegerField()
    # content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self) -> str:
        return self.column_type.name


class ColumnType(models.Model):
    name = models.CharField(max_length=100)
    data_type = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name

class Column(AbstractBaseColumn):
    column_type =  models.ForeignKey(ColumnType, on_delete=models.CASCADE, related_name="column_type_columns", null=True)
    frame = models.ForeignKey(Frame, on_delete=models.CASCADE, related_name="frame_columns", null=True)
    records_added = models.BooleanField(default=False, null=True)
    # name = models.CharField(max_length=100)

class Record(models.Model):
    record_id = models.CharField(max_length=100)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="player_records", null=True)
    column = models.ForeignKey(Column, on_delete=models.CASCADE, related_name="column_records", null=True)
    # frame = models.ForeignKey(Frame, on_delete=models.CASCADE, related_name="frame_records", null=True)
    int_value = models.IntegerField(null=True) 
    float_value = models.FloatField(null=True)
    str_value = models.CharField(max_length=100, null=True) # use serializer to get correct value

    def get_val(self):
        dt = self.column.column_type.data_type
        if dt == 'int':
            return self.int_value
        elif dt == 'float':
            return self.float_value
        elif dt == 'str':
            return self.str_value

class CustomFrame(models.Model):
    frame_id = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_custom_frames", null=True)
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name

# class CustomRecord(models.Model):
#     custom_frame = models.ForeignKey(CustomFrame, on_delete=models.CASCADE, related_name="custom_frame_custom_records", null=True)
#     record = models.ForeignKey(Record, on_delete=models.CASCADE, related_name="record_custom_records", null=True)

class CustomColumnType(models.Model):
    name = models.CharField(max_length=100)
    data_type = ''
    source = '' # can be col

class CustomColumn(AbstractBaseColumn):
    custom_frame = models.ForeignKey(CustomFrame, on_delete=models.CASCADE, related_name="frame_columns", null=True)
    column_type = models.ForeignKey(CustomColumnType, on_delete=models.CASCADE, related_name="custom_column_type_columns", null=True)
    # columns = GenericRelation(AbstractBaseColumn, related_query_name="column_custom_columns")
    reg_ex = ''

# class Composition(models.Model):
#     custom_column = models.OneToOneField(CustomColumn, primary_key=True)

# class CustomColumnDef(models.Model): # lookup table
#     composition = models.ForeignKey(Composition, on_delete=models.CASCADE, related_name="standard_column_custom_columns", null=True)
#     column_standard = models.ForeignKey(Column, on_delete=models.CASCADE, related_name="standard_column_custom_columns", null=True) # change to pointer to the custom column instead of adding each column
#     column_custom = models.ForeignKey(CustomColumn, on_delete=models.CASCADE, related_name="custom_column_custom_columns", null=True) 
#     param = ''

#     def add_column(self, column, composition):
#         if type(column) == 'Custom_Column':
#             pass

class CustomPlayer(models.Model):
    custom_frame = models.ForeignKey(CustomFrame, on_delete=models.CASCADE, related_name="frame_players", null=True)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="player_custom_players", null=True)

class UserFrame(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_frames", null=True)
    frame = models.ForeignKey(Frame, on_delete=models.CASCADE, related_name="frame_users", null=True)

    def __str__(self) -> str:
        return f'{self.user.name}: {self.frame.frame_id}'

# custom_frame = user.user_custom_frames.get(id=4)
# frame_records = custom_frame.custom_frame_custom_records.all()
# data = [{'record_id': record.record_id, 'player_name': record.player.name, } for record in frame_records]


# class Team(models.Model):
#     team_id = models.CharField(max_length=100)
#     name = models.CharField(max_length=100)
#     comp_id = models.ForeignKey(max_length=100)
    

# class StandardStats(models.Model):
#     record_id = models.CharField(max_length=100)
#     frame = models.ForeignKey(Frame, on_delete=models.CASCADE, related_name="standard_stats_frame_records", null=True)
#     player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="standard_stats_player_records", null=True)

#     games_starts = models.IntegerField()
#     minutes = models.IntegerField()
#     goals = models.IntegerField()
#     assists = models.IntegerField()
#     xg = models.FloatField()
#     xa = models.FloatField()


#     def __str__(self) -> str:
#         return f'{self.frame} {self.player}'

# class ShootingStats(models.Model):
#     record_id = models.CharField(max_length=100)
#     frame = models.ForeignKey(Frame, on_delete=models.CASCADE, related_name="shooting_stats_frame_records", null=True)
#     player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="shooting_stats_player_records", null=True)

#     games_starts = models.IntegerField()
#     minutes = models.IntegerField()
#     goals = models.IntegerField()
#     assists = models.IntegerField()
#     xg = models.FloatField()
#     xa = models.FloatField()


#     def __str__(self) -> str:
#         return f'{self.frame} {self.player}'

def clear():
    FrameType.objects.all().delete()
    Player.objects.all().delete()
    ColumnType.objects.all().delete()
    CustomFrame.objects.all().delete()
    # User.objects.all().delete()

# from stats_api.models import clear, Frame, Player, StandardStats
# >>> player.record_set.create(record_id='a', frame=frame, game_starts=10, minutes=23, goals=2, assists=5, xg=1.5, xa=17.5)
# frame = Frame(frame_id="a", comp="b", frame_type="c", subject="d")
# >>> player = Player(player_id="e", name="g")
# type_model = apps.get_model('stats_app', frame_type)