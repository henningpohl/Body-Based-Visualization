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

tibble(level = levels(elementRatings$Response)) |>
  mutate(level = str_replace(level, ' ', '\n')) |>
  mutate(level = factor(level, levels=level)) |>
  mutate(width = str_count(level)) |>
  mutate(color = cr_choose_bw(RColorBrewer::brewer.pal(7, 'RdBu'))) |>
  ggplot(aes(x=level, y=0, fill=level, label=level)) +
  geom_tile(color='white') +
  geom_text(position=position_stack(vjust=0.5), 
            color=cr_choose_bw(RColorBrewer::brewer.pal(7, 'RdBu')), 
            fontface='bold', size=2.4) +
  scale_fill_brewer(palette='RdBu') +
  theme_void(base_size=10) +
  theme(legend.position = "none") +
  theme(plot.margin=margin(l=0.0, r=0.0, unit='in')) -> likertLegend
