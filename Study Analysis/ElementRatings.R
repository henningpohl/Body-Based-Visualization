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
  scale_fill_brewer(palette='RdBu', breaks=rev(levels(elementRatings$Response))) +
  facet_wrap(~Question, strip.position='top', ncol=1) +
  theme_minimal(base_size=10) +
  theme(strip.background = element_blank()) +
  theme(legend.position = "right", legend.text = element_text(size=7))
ggsave('ElementRatings.pdf', scale=1.2, width=5.5, height=2.6, units="in", device=cairo_pdf)
