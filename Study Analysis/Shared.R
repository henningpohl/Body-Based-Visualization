library(tidyverse)

(function() {
  data <- read_csv('Questionnaire.csv') |>
    rename_with(~'Prolific', contains('Prolific'))
  
  levels <- c('Strongly disagree', 'Disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Agree', 'Strongly agree')
  
  data |>
    select(Prolific, contains('<element>')) |>
    pivot_longer(-Prolific, values_to='Response', names_pattern='(I liked|I think|The).+ \\[(.+)\\]', names_to=c('Question', 'Element')) |>
    mutate(Question = case_match(Question, 'I liked' ~ 'Liked', 'I think' ~ 'Useful', 'The' ~ 'Distracting')) |>
    mutate(Element = str_to_title(Element)) |>
    mutate(Response = factor(Response, levels=levels)) ->>
    elementRatings
  
  data |>
    select(Prolific, starts_with('I was able'):starts_with('The information')) |>
    pivot_longer(-Prolific, values_to='Response', names_to='Question') |>
    mutate(Response = factor(levels[Response], levels=levels)) ->>
    overallRatings
  
  data |>
    select(Prolific, contains('?')) |>
    pivot_longer(-Prolific, values_to='Response', names_to='Question') ->>
    comments
})()
