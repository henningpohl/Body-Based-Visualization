source('Shared.R')
library(xtable)

overallRatings |>
  select(-PID) |>
  mutate(Element = 'X') |>
  rbind(elementRatings) |>
  group_by(Element, Question) |>
  reframe(qs = quantile(as.numeric(Response), c(0.25, 0.5, 0.75)), name=c('25% Quantile', 'Median', '75% Quantile')) |>
  mutate(qs = ceiling(qs * 2) / 2) |>
  mutate(qs = case_when(
    qs == 1   ~ 'Strongly Disagree',
    qs == 1.5 ~ 'Strongly Disagree/Disagree',
    qs == 2   ~ 'Disagree',
    qs == 2.5 ~ 'Disagree/Slightly Disagree',
    qs == 3   ~ 'Slightly Disagree',
    qs == 3.5 ~ 'Slightly Disagree/Neutral',
    qs == 4   ~ 'Neutral',
    qs == 4.5 ~ 'Neutral/Slightly Agree',
    qs == 5   ~ 'Slightly Agree',
    qs == 5.5 ~ 'Slightly Agree/Agree',
    qs == 6   ~ 'Agree',
    qs == 6.5 ~ 'Agree/Strongly Agree',
    qs == 7   ~ 'Strongly Agree'
  )) |>
  pivot_wider(names_from = 'name', values_from = 'qs') |>
  mutate(Question = case_match(Question,
                               'Distracting' ~ 'The <element> was distracting',
                               'Liked' ~ 'I liked the <element>',
                               'Useful' ~ 'I think the <element> was useful',
                               .default = Question
  )) |>
  mutate(Element = case_when(Element == 'X' ~ 'Overall', .default = Element)) |>
  xtable() %>%
  print(booktabs=T, include.rownames=F)
