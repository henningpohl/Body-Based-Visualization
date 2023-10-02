library(tidyverse)

dem <- read_csv('Demographics.csv') |>
  filter(Status == 'APPROVED') |>
  filter(`Participant id` != '611666722763d407c769eb9b') # technical difficulties, didn't actually do study

dem |>
  mutate(Age = as.numeric(Age)) |>
  summarize(mean=mean(Age), sd=sd(Age), min=min(Age), max=max(Age))

dem |>
  group_by(Sex) |>
  count()


dem |>
  group_by(`Ethnicity simplified`) |>
  count()

dem |>
  group_by(`Country of residence`) |>
  count()
