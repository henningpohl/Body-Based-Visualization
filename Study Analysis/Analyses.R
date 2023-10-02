source('Shared.R')

# Only the negative ratings
elementRatings |>
  filter(Question == 'Liked') |>
  filter(Response < 'Neutral') |>
  print()

