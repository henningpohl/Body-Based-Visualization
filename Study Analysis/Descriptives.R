source('Shared.R')

rbind(
elementRatings |>
  mutate(Question = case_match(Question,
    'Distracting' ~ paste('The', Element, 'was distracting'),
    'Liked' ~ paste('I liked the', Element),
    'Useful' ~ paste('I think the', Element, 'was useful')
  )) |>
  group_by(Question) |>
  reframe(qs = quantile(Response, c(0.25, 0.5, 0.75), type=1), name=c('25%', 'Median', '75%')) |>
  pivot_wider(names_from = 'name', values_from = 'qs'),
overallRatings |>
  group_by(Question) |>
  reframe(qs = quantile(Response, c(0.25, 0.5, 0.75), type=1), name=c('25%', 'Median', '75%')) |>
  pivot_wider(names_from = 'name', values_from = 'qs')) |>
print(width=300)
