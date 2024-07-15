source('Shared.R')

overallRatings |>
  gglikert(Response, facet_rows=vars(Question), add_totals = FALSE, add_labels = FALSE) +
  scale_fill_brewer(palette='RdBu', breaks=rev(levels(elementRatings$Response))) +
  facet_wrap(~Question, strip.position='top', ncol=1) +
  theme_minimal(base_size=10) +
  theme(strip.background = element_blank()) +
  theme(axis.text.y = element_blank()) +
  theme(legend.position = "right", legend.text = element_text(size=7))
ggsave('OverallRatings.pdf', scale=1.2, width=5.5, height=2.0, units="in", device=cairo_pdf)
