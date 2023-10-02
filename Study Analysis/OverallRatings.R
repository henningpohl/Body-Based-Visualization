source('Shared.R')

overallRatings |>
  #pivot_wider(names_from='Question', values_from='Response') |>
  gglikert(3, facet_rows=vars(Question), add_totals = FALSE, add_labels = FALSE) +
  scale_fill_brewer(palette='RdBu', labels=c('Strongly Disagree', '', '', '', '', '', 'Strongly Agree')) +
  facet_wrap(~Question, strip.position='top', ncol=1) +
  theme_minimal(base_size=10) +
  theme(strip.background = element_blank()) +
  theme(legend.position = "none") +
  theme(axis.text.y = element_blank()) ->
  plotA

ggarrange(plotA, likertLegend, nrow=2, heights=c(0.89, 0.11))
ggsave('OverallRatings.pdf', scale=1.4, width=3.34, height=2.1, units="in", device=cairo_pdf)

