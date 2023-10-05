library(tidyverse)

levels <- c('Strongly disagree', 'Disagree', 'Slightly disagree', 'Neutral', 'Slightly agree', 'Agree', 'Strongly agree')

data <- read_csv('Questionnaire.csv') |>
  rename_with(~'Prolific', contains('Prolific')) |>
  mutate(PID = paste('P', as.integer(factor(Prolific)), sep=''), .before=1) |>
  select(-Timestamp, -Prolific) |>
  arrange(as.numeric(str_extract(PID, '\\d+'))) |>
  mutate(across(starts_with('I was able'):starts_with('The information'), 
         ~factor(levels[.x], ordered=TRUE, levels=levels)))

write_csv(data, 'export.csv')

  