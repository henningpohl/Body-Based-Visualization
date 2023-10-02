source('Shared.R')

elementRatings |>
  pivot_wider(names_from='Element', values_from='Response') |>
  mutate(Question = case_match(Question,
    'Distracting' ~ 'The <element> was distracting',
    'Liked' ~ 'I liked the <element>',
    'Useful' ~ 'I think the <element> was useful'
  )) |>
  gglikert(`Name Tag`:`Conversation Timer`, facet_rows=vars(Question),
           add_totals = FALSE, add_labels = FALSE) +
  scale_fill_brewer(palette='RdBu', labels=c('Strongly Disagree', '', '', '', '', '', 'Strongly Agree')) +
  facet_wrap(~Question, strip.position='top', ncol=1) +
  theme_minimal(base_size=10) +
  theme(strip.background = element_blank()) +
  theme(legend.position = "none") ->
  plotA


ggarrange(plotA, likertLegend, nrow=2, heights=c(0.92, 0.08))
ggsave('ElementRatings.pdf', scale=1.4, width=3.34, height=3.1, units="in", device=cairo_pdf)

