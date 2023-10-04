import pandas as pd
from jinja2 import Template

template = Template('''
<!DOCTYPE html>
<html lang="en">
<head>
<title>Participant Comments</title>
<style>
body { max-width:800px; margin: auto; }
.block { page-break-inside: avoid; }
dt { font-weight: bold; }
dd { margin: 0 0 0.5em 0; padding: 0 0 0.5em 0; }
</style>
</head>
<body>

{% for question, data in comments %}

<div class="block">
<h2>{{ question }}</h2>

<ul>
{% for _, row in data.iterrows() %}
<li>{{row['Response']}} <i>({{row['Prolific']}} - {{row['PID']}})</i></li>
{% endfor %}
</ul>

</div>

{% endfor %}

</body>
</html>
''')

comments = pd.read_csv('Questionnaire.csv')
comments = comments.filter(regex=r'Prolific|\?')
comments = comments.rename(columns={'Please enter your Prolific ID': 'Prolific'})
comments['PID'] = comments['Prolific'].astype('category').cat.codes + 1
comments['PID'] = 'P' + comments['PID'].astype('str')

comments = pd.melt(comments, id_vars=['Prolific', 'PID'], value_name='Response', var_name='Question')

with open('Comments2.html', 'w', encoding='utf8') as f:
    output = template.render(comments=comments.groupby('Question'))
    f.write(output)

