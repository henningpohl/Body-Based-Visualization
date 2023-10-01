library(ggplot2)
library(ggstats)
#remotes::install_github("matt-dray/coloratio")
library(coloratio)
library(ggpubr)
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


tibble(level = levels(elementRatings$Response)) |>
  mutate(level = factor(level, levels=level)) |>
  mutate(width = str_count(level)) |>
  mutate(color = cr_choose_bw(RColorBrewer::brewer.pal(7, 'RdBu'))) |>
  ggplot(aes(x=1, y=max(width), fill=level, label=level)) +
  geom_col(color='white') +
  geom_text(position=position_stack(vjust=0.5), 
            color=cr_choose_bw(RColorBrewer::brewer.pal(7, 'RdBu')), 
            fontface='bold', size=2.4) +
  scale_fill_brewer(palette='RdBu') +
  coord_flip() +
  theme_void(base_size=10) +
  theme(legend.position = "none") +
  theme(plot.margin=margin(l=-0.3, r=-0.3, unit='in')) ->
  plotB

ggarrange(plotA, plotB, nrow=2, heights=c(0.95, 0.05))
ggsave('OverallRatings.pdf', scale=1.8, width=3.34, height=3.1, units="in", device=cairo_pdf)

