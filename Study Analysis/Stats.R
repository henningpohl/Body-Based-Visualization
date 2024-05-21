source("Shared.R")
library(broom)
library(ggstats)
library(ordinal)
library(RVAideMemoire)
library(xtable)

overallRatings |>
  group_by(Question) |>
  summarize(res = tidy(wilcox.test(as.numeric(Response), mu=4, exact=F))) |>
  unnest(cols = c(res)) |>
  mutate(sig = noquote(signif_stars(p.value, point=NULL)), .after='p.value') |>
  select(-method)

elementRatings |>
  group_by(Question, Element) |>
  summarize(res = tidy(wilcox.test(as.numeric(Response), mu=4, exact=F))) |>
  unnest(cols = c(res)) |>
  mutate(sig = noquote(signif_stars(p.value, point=NULL)), .after='p.value') |>
  select(-method) 

elementRatings |>
  group_by(Question, Element) |>
  summarize(res = tidy(wilcox.test(as.numeric(Response), mu=4, exact=F))) |>
  unnest(cols = c(res)) |>
  mutate(sig = noquote(signif_stars(p.value, point=NULL)), .after='p.value') |>
  select(-method, -alternative) |>
  xtable(digits=c(0, 0, 2, 0, 3, 0)) %>%
  print(booktabs=T, include.rownames=F)

Anova.clmm(clmm(Response ~ Element + (1|Prolific), data = filter(elementRatings, Question == 'Liked')), type=3)
Anova.clmm(clmm(Response ~ Element + (1|Prolific), data = filter(elementRatings, Question == 'Useful')), type=3)
Anova.clmm(clmm(Response ~ Element + (1|Prolific), data = filter(elementRatings, Question == 'Distracting')), type=3)
