library(tidyverse)
library(ggplot2)
library(ggstats)
#remotes::install_github("matt-dray/coloratio")
library(coloratio)
library(ggpubr)

(function() {
  data <- read_csv('Questionnaire.csv') |>
    rename_with(~'Prolific', contains('Prolific')) |>
    mutate(PID = paste('P', as.integer(factor(Prolific)), sep=''), .before=1)
  
  levels <- c('Strongly disagree', 'Disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Agree', 'Strongly agree')
  
  data |>
    select(PID, Prolific, contains('<element>')) |>
    pivot_longer(-Prolific, values_to='Response', names_pattern='(I liked|I think|The).+ \\[(.+)\\]', names_to=c('Question', 'Element')) |>
    drop_na(Question) |>
    mutate(Question = case_match(Question, 'I liked' ~ 'Liked', 'I think' ~ 'Useful', 'The' ~ 'Distracting')) |>
    mutate(Element = str_to_title(Element)) |>
    mutate(Response = factor(Response, ordered=TRUE, levels=levels)) ->>
    elementRatings
  
  data |>
    select(PID, Prolific, starts_with('I was able'):starts_with('The information')) |>
    pivot_longer(-c(PID, Prolific), values_to='Response', names_to='Question') |>
    mutate(Response = factor(levels[Response], ordered=TRUE, levels=levels)) ->>
    overallRatings
  
  data |>
    select(PID, Prolific, contains('?')) |>
    pivot_longer(-c(PID, Prolific), values_to='Response', names_to='Question') ->>
    comments
})()

