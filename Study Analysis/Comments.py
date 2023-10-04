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

{% for comment in comments %}

<div class="block">
<h2>{{ comment[1] }} - {{ comment[6] }}</h2>
<dl>
<dt>How would you describe the effect of those visualizations on the conversation from your perspective?</dt>
<dd>{{ comment[2] }}</dd>
<dt>What do you think would be information that could be helpful for you to have in a conversation?</dt>
<dd>{{ comment[3] }}</dd>
<dt>What would, in your opinion, be the best way to visualize the information you got during the conversation?</dt>
<dd>{{ comment[4] }}</dd>
<dt>Do you have any other comments for us?</dt>
<dd>{{ comment[5] }}</dd>
</dl>
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

with open('Comments.html', 'w', encoding='utf8') as f:
    output = template.render(comments=comments.to_records())
    f.write(output)

