from django.http import JsonResponse

from rest_framework.views import APIView
from sympy import N, latex

# from sympy import Symbol
# from sympy.parsing.latex import parse_latex

from .models import CustomTable, Expression, CustomColumn

# Create a class view for custom columns
class CustomColumnView(APIView):
    def get(self, request, *args, **kwargs):
        # Get the data from the request
        data = request.GET
        # Get the custom table
        table = CustomTable.objects.first()
        # Get the custom columns
        column = table.customcolumn_set.get(id='column_id')
        resolved = column.resolve_custom_column()
        players = []
        response = {'stats': []}
        for player in players:
            # records = player.player_records.all()
            # records_dict = {r.column.name: r.value for r in records}
            evaluated = column.eval_column(player, resolved)
            response['stats'].append({
                'player': player.id,
                'value': evaluated
            })
        return JsonResponse({'data': response})

    def post(self, request, *args, **kwargs):
        # Get the data from the request
        data = request.data
        print(data)
        # table = CustomTable.objects.get(id=data['table_id'])
        try:
            table = CustomTable.objects.first()
        except CustomTable.DoesNotExist:
            table = CustomTable.objects.create(name='Custom Table', description='Custom Table test')
        # Create a new custom column
        print(table)
        exp = Expression(expression=data['latex'])
        exp.save()
        column = table.customcolumn_set.create(
            name=data['name'],
            expression=exp,
            description=data['description']
        )
        print(column, 'col')
        return JsonResponse({'data': latex(column.resolve_custom_column()), 'column_id': column.id})

class CustomStandardColumnsView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        column = CustomColumn()

class CustomColumnsView(APIView):
    def get(self, request, *args, **kwargs):
        # Get the data from the request
        data = request.GET
        # Get the custom table
        table = CustomTable.objects.first()
        # Get the custom columns
        columns = table.customcolumn_set.all()
        response = {'columns': []}
        for column in columns:
            response['columns'].append({
                'id': column.id,
                'name': column.name,
                'description': column.description,
                'latex': latex(column.resolve_custom_column())
            })
        return JsonResponse({'data': response})
    
    def post(self, request, *args, **kwargs):
        # Get the data from the request
        data = request.data
        # Get the custom table
        table = CustomTable.objects.first()
        # Create a new custom column
        column = table.customcolumn_set.create(
            name=data['name'],
            expression=data['expression'],
            description=data['description']
        )
        return JsonResponse({'data': latex(column.resolve_custom_column()), 'column_id': column.id})

class CustomTableView(APIView):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'regex': 'exp'})

    def post(self, request, *args, **kwargs):
        data = request.body.decode('utf-8')
        # data = {name: '', description: '', columns: [{name: '', expression: '', description: ''}, ...]}
        custom_table = CustomTable(name=data['name'], description=data['description'])
        return JsonResponse({'data': data})

