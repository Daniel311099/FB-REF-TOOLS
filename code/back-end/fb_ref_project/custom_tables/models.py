from django.db import models
from django.db.models import Q, F

from sympy import Symbol, simplify, latex
from sympy.parsing.latex import parse_latex

from stats_api.models import Column, Player
# Create your models here.

class CustomTable(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name

class Expression(models.Model):
    expression = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.expression

class CustomColumn(models.Model): # only stores the defintion 
    # custom_table = models.ForeignKey(CustomTable, on_delete=models.CASCADE)
    expression = models.OneToOneField(Expression, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    custom = models.BooleanField(default=False)
    cached_columns = { # change to a list of dicts, find solution for multiple instances 
        'columnn_id': {
            'child': None, # could respresent another custom column or a standard column
            'used': False,
        }
    }
    def __str__(self):
        return self.name

    def eval_column(self, player, resolved_ex):
        records = player.player_records.filter(column=self)
        records_json = {r.column.name: r.value for r in records}
        return resolved_ex.evalf(4, subs=records_json)

    def resolve_custom_column(self):
        # placeholders = set(self.expression.placeholder_set.all())
        # parsed_exp = parse_latex(self.expression)
        # resolved = {p.char: self.resolve_exp(p) for p in placeholders}
        resolved = self.resolve_exp(self.expression)
        return resolved

    def resolve_exp(self, exp): # takes exp object
        placeholders = exp.placeholder_set.all()    
        print(parse_latex, exp.expression)
        parsed_exp = parse_latex(exp.expression)
        simplified = simplify(parsed_exp)
        print(parsed_exp)
        for placeholder in placeholders: # on each loop the matching placeholder is replaced with the value
            if not placeholder.custom:
                # filter unused columns from cached_columns
                return Symbol(placeholder.char)
            else:
                custom_column = exp.custom_column
                try: 
                    resolved_child = self.cached_columns[custom_column.id]
                    self.cached_columns[custom_column.id]['used'] = True
                except KeyError:
                    expression = custom_column.expression
                    # placeholders = set(expression.placeholder_set.all())
                    resolved_child = self.resolve_exp(expression)
                    self.cached_columns[custom_column.id] = {'child': resolved_child, 'used': False}
                simplified.subs(placeholder.char, resolved_child)
                # place_string = ' '.join(map(lambda x: x.char, placeholders))
                # place_symbols = map(lambda x: Symbol(x.char), placeholders)
                # for symbol in place_symbols:
                #     expression = expression.replace(symbol, self.resolve_exp(symbol))
        return simplified

class ColumnInstance(models.Model): 
    custom_table = models.ForeignKey(CustomTable, on_delete=models.CASCADE)
    column = models.ForeignKey(Column, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.custom_table.name + " " + self.column.name

class CustomColumnInstance(models.Model):
    custom_table = models.ForeignKey(CustomTable, on_delete=models.CASCADE)
    custom_column = models.ForeignKey(CustomColumn, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.custom_table.name + ' ' + self.custom_column.name

class PlaceHolder(models.Model):
    expression = models.ForeignKey(Expression, on_delete=models.CASCADE)
    custom_column = models.ForeignKey(CustomColumn, on_delete=models.CASCADE, null=True)
    column = models.ForeignKey(Column, on_delete=models.CASCADE, null=True)
    custom = models.BooleanField(default=False)
    char = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.expression.custom_column.name + ' ' + self.char
    class Meta:
        # custom = self.custom
        constraints = [
            models.CheckConstraint(
                name = 'custom or column',
                check = ((Q(custom_column__isnull = False) &
                        Q(custom = True)) |
                        (Q(column__isnull = False) &
                        Q(custom = False))
                ),
            ),
        ]
# class SubjectInstance(models.Model):
#     custom_table = models.ForeignKey(CustomColumn, on_delete=models.CASCADE)
#     player = models.ForeignKey(Player, on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     def __str__(self):
#         return self.player.name + ' ' + self.custom_table.name